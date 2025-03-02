import React, { useState, useEffect, useRef } from "react";
import "./OrderPlacedChat.css";
import Avatar from "./img/oli.webp";
import AvatarSSend from "./img/Avatarsend.png";
import {
  getCurrentOrder,
  getOrderMessages,
  sendOrderMessage,
  getResumeImages,
} from "../../../../../../Services/apiCalls";
import { useParams } from "react-router-dom";
import Loader from "../../../../../Common/Loader";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

function OrderPlacedChat() {
  const [templateImages, setTemplateImages] = useState([]);
  const [templatesLoading, setTemplatesLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [orderData, setOrderData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const [lastMessageTimestamp, setLastMessageTimestamp] = useState(null);
  const [requirementsSubmittedViaMessage, setRequirementsSubmittedViaMessage] =
    useState(false);
  const [orderStartedViaMessage, setOrderStartedViaMessage] = useState(false);
  const [orderPlacedViaMessage, setorderPlacedViaMessage] = useState(false);
  const [orderDeliveredViaMessage, setorderDeliveredViaMessage] =
    useState(false);
  const [requestedRevisionViaMessage, setrequestedRevisionViaMessage] =
    useState(false);
  const [daliverDataUpdatedViaMessage, setdaliverDataUpdatedViaMessage] =
    useState(false);
  const [previousMessageCount, setPreviousMessageCount] = useState(0);

  const hasTextMessage = messageText.trim().length > 0;
  const hasFiles = selectedFiles.length > 0;

  const statusMessages = {
    requirements: "you submitted the requirements",
    orderStarted: "your order started",
    placedOrder: "you placed the order",
    orderDelivered: "your order delivered",
    requestedRevision: "you requested revision",
    deliveryDateUpdated: "your delivery date was updated",
  };

  const chatContainerRef = useRef(null);
  const pollingIntervalRef = useRef(null);

  const { orderId } = useParams();

  const images =
    templateImages.length > 0
      ? templateImages
      : [
          { src: "", name: "Template A" },
          { src: "", name: "Template B" },
          { src: "", name: "Template C" },
        ];

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const scrollContainer = chatContainerRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
      setHasNewMessages(false);
    }
  };

  const fetchMessages = async (orderId) => {
    if (!orderId) return;

    try {
      const messagesResponse = await getOrderMessages(orderId);

      if (messagesResponse && messagesResponse.messages) {
        const formattedMessages = messagesResponse.messages.map((msg) => ({
          message: msg.message,
          sender_type: msg.side === "right" ? "user" : "admin",
          sender_name: msg.user || "Team Member",
          created_at: msg.created_at || new Date().toISOString(),
          attachments: msg.attachments || [],
        }));

        const hasNewIncomingMessages =
          formattedMessages.length > previousMessageCount;

        if (lastMessageTimestamp) {
          const newAdminMessages = formattedMessages.filter(
            (msg) =>
              msg.sender_type === "admin" &&
              new Date(msg.created_at) > new Date(lastMessageTimestamp)
          );

          if (newAdminMessages.length > 0) {
            setHasNewMessages(true);

            if (hasNewIncomingMessages && chatContainerRef.current) {
              const { scrollTop, scrollHeight, clientHeight } =
                chatContainerRef.current;
              const isNearBottom =
                scrollHeight - scrollTop - clientHeight < 200;

              if (isNearBottom) {
                setTimeout(scrollToBottom, 100);
              }
            }
          }
        }

        if (formattedMessages.length > 0) {
          const timestamps = formattedMessages.map((msg) =>
            new Date(msg.created_at).getTime()
          );
          const latestTimestamp = new Date(
            Math.max(...timestamps)
          ).toISOString();
          setLastMessageTimestamp(latestTimestamp);
        }

        setPreviousMessageCount(formattedMessages.length);
        setMessages(formattedMessages);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setLoading(true);
        const orderResponse = await getCurrentOrder();

        if (orderResponse && orderResponse.data) {
          setOrderData(orderResponse.data);

          await fetchMessages(orderResponse.data.order_id);
        }

        console.log(messages, "messages");

        setLoading(false);
      } catch (err) {
        console.error("Error fetching order data:", err);
        setError(
          "Failed to load order data. Please refresh the page or try again later."
        );
        setLoading(false);
      }
    };

    fetchOrderData();

    if (orderData?.order_id) {
      pollingIntervalRef.current = setInterval(() => {
        fetchMessages(orderData.order_id);
      }, 1000);
    }

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [orderData?.order_id]);

  useEffect(() => {
    const handleScroll = () => {
      if (chatContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          chatContainerRef.current;
        if (scrollHeight - scrollTop - clientHeight < 50) {
          setHasNewMessages(false);
        }
      }
    };

    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const checkMessageContains = (messageText, searchText) => {
      return messageText && messageText.toLowerCase().includes(searchText);
    };

    const hasRequirements = messages.some((msg) =>
      checkMessageContains(msg.message, statusMessages.requirements)
    );
    if (hasRequirements) {
      setRequirementsSubmittedViaMessage(true);
    }

    const hasOrderStarted = messages.some((msg) =>
      checkMessageContains(msg.message, statusMessages.orderStarted)
    );
    if (hasOrderStarted) {
      setOrderStartedViaMessage(true);
    }

    const hasOrderPlaced = messages.some((msg) =>
      checkMessageContains(msg.message, statusMessages.placedOrder)
    );
    if (hasOrderPlaced) {
      setorderPlacedViaMessage(true);
    }

    const hasOrderDelivered = messages.some((msg) =>
      checkMessageContains(msg.message, statusMessages.orderDelivered)
    );
    if (hasOrderDelivered) {
      setorderDeliveredViaMessage(true);
    }

    const hasRequestedRevision = messages.some((msg) =>
      checkMessageContains(msg.message, statusMessages.requestedRevision)
    );
    if (hasRequestedRevision) {
      setrequestedRevisionViaMessage(true);
    }

    const hasDeliveryDateUpdated = messages.some((msg) =>
      checkMessageContains(msg.message, statusMessages.deliveryDateUpdated)
    );
    if (hasDeliveryDateUpdated) {
      setdaliverDataUpdatedViaMessage(true);
    }
  }, [messages]);

  useEffect(() => {
    const fetchTemplateImages = async () => {
      try {
        setTemplatesLoading(true);
        const response = await getResumeImages();

        if (response && response.http_status === 200 && response.data) {
          const formattedImages = response.data.map((item, index) => ({
            src: item.image,
            name: `Template ${String.fromCharCode(65 + index)}`,
            id: item.id,
          }));

          setTemplateImages(formattedImages);
        }
      } catch (err) {
        console.error("Error fetching resume templates:", err);
      } finally {
        setTemplatesLoading(false);
      }
    };

    fetchTemplateImages();
  }, []);

  useEffect(() => {
    if (messages.length > 0 && !loading) {
      setTimeout(scrollToBottom, 300);
    }
  }, [messages.length, loading]);

  const handleSendMessage = async () => {
    try {
      if (!hasTextMessage && !hasFiles) return;

      setSendingMessage(true);
      setHasNewMessages(false);

      await sendOrderMessage(
        orderData.order_id,
        messageText.trim() || selectedFiles[0]
      );

      setMessageText("");
      setSelectedFiles([]);

      const messagesResponse = await getOrderMessages(orderData.order_id);

      if (messagesResponse && messagesResponse.messages) {
        const formattedMessages = messagesResponse.messages.map((msg) => ({
          message: msg.message,
          sender_type: msg.side === "right" ? "user" : "admin",
          sender_name: msg.user || "Team Member",
          created_at: msg.created_at || new Date().toISOString(),
          attachments: msg.attachments || [],
        }));

        setMessages(formattedMessages);

        setTimeout(scrollToBottom, 100);
        setPreviousMessageCount(formattedMessages.length);
      }
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Failed to send message. Please try again.");
    } finally {
      setSendingMessage(false);
    }
  };

  const handleOrderAgain = () => {
    window.location.href = "/order";
  };

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const navigateImage = (direction) => {
    if (direction === "prev") {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
    } else if (direction === "next") {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const getBackgroundImage = (index) => {
    if (
      templatesLoading ||
      !templateImages[index] ||
      !templateImages[index].src
    ) {
      return {
        backgroundColor: "#f0f0f0",
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }

    return {
      backgroundImage: `url(${templateImages[index].src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.type === "application/pdf");

    if (files.length !== validFiles.length) {
      alert("Only PDF files are allowed.");
    }

    setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);

    e.target.value = null;
  };

  const isStatusMessage = (messageText) => {
    if (!messageText) return false;

    const lowercaseMessage = messageText.toLowerCase();

    return Object.values(statusMessages).some((statusText) =>
      lowercaseMessage.includes(statusText)
    );
  };

  const getCombinedMessages = () => {
    const regularMessages = messages.filter(
      (message) => !isStatusMessage(message.message)
    );

    const statusCards = [];

    if (orderPlacedViaMessage) {
      const statusMsg = messages.find(
        (msg) =>
          msg.message &&
          msg.message.toLowerCase().includes(statusMessages.placedOrder)
      );
      if (statusMsg) {
        statusCards.push({
          type: "status",
          statusType: "placed",
          created_at: statusMsg.created_at,
          apiDate: orderData?.created_at || null,
          title: "You placed the order",
          icon: "plase",
        });
      }
    }

    if (requirementsSubmittedViaMessage) {
      const statusMsg = messages.find(
        (msg) =>
          msg.message &&
          msg.message.toLowerCase().includes(statusMessages.requirements)
      );
      if (statusMsg) {
        statusCards.push({
          type: "status",
          statusType: "requirements",
          created_at: statusMsg.created_at,
          apiDate: orderData?.requirements_submitted_at || null,
          title: "You submitted the requirements",
          icon: "edit",
        });
      }
    }

    if (orderStartedViaMessage) {
      const statusMsg = messages.find(
        (msg) =>
          msg.message &&
          msg.message.toLowerCase().includes(statusMessages.orderStarted)
      );
      if (statusMsg) {
        statusCards.push({
          type: "status",
          statusType: "started",
          created_at: statusMsg.created_at,
          apiDate: orderData?.order_started_at || null,
          title: "Your order started",
          icon: "start",
        });
      }
    }

    if (orderDeliveredViaMessage) {
      const statusMsg = messages.find(
        (msg) =>
          msg.message &&
          msg.message.toLowerCase().includes(statusMessages.orderDelivered)
      );
      if (statusMsg) {
        statusCards.push({
          type: "status",
          statusType: "delivered",
          created_at: statusMsg.created_at,
          apiDate: orderData?.delivered_at || null,
          title: "Your Order delivered",
          icon: "delivered",
        });
      }
    }

    if (requestedRevisionViaMessage) {
      const statusMsg = messages.find(
        (msg) =>
          msg.message &&
          msg.message.toLowerCase().includes(statusMessages.requestedRevision)
      );
      if (statusMsg) {
        statusCards.push({
          type: "status",
          statusType: "revision",
          created_at: statusMsg.created_at,
          apiDate: orderData?.revision_requested_at || null,
          title: "You requested revision",
          icon: "revision",
        });
      }
    }

    if (daliverDataUpdatedViaMessage) {
      const statusMsg = messages.find(
        (msg) =>
          msg.message &&
          msg.message.toLowerCase().includes(statusMessages.deliveryDateUpdated)
      );
      if (statusMsg) {
        statusCards.push({
          type: "status",
          statusType: "update",
          created_at: statusMsg.created_at,
          apiDate: orderData?.delivery_date_updated || null,
          title: `Your delivery date was updated to ${
            orderData?.new_delivery_date
              ? new Date(orderData.new_delivery_date).toLocaleDateString(
                  "en-US",
                  { month: "long", day: "numeric" }
                )
              : new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })
          }`,
          icon: "update",
        });
      }
    }

    const combined = [...regularMessages, ...statusCards];

    return combined.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateA - dateB;
    });
  };

  const removeFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const getStatusIcon = (statusType) => {
    switch (statusType) {
      case "placed":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_208_18434)">
              <path
                d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
                stroke="#4A7D06"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 12L20 7.5"
                stroke="#4A7D06"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 12V21"
                stroke="#4A7D06"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 12L4 7.5"
                stroke="#4A7D06"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 5.25L8 9.75"
                stroke="#4A7D06"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_208_18434">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        );
      case "requirements":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_40000010_7999)">
              <path
                d="M4 19.9998H8L18.5 9.49981C18.7626 9.23717 18.971 8.92537 19.1131 8.58221C19.2553 8.23905 19.3284 7.87125 19.3284 7.49981C19.3284 7.12838 19.2553 6.76058 19.1131 6.41742C18.971 6.07426 18.7626 5.76246 18.5 5.49981C18.2374 5.23717 17.9256 5.02883 17.5824 4.88669C17.2392 4.74455 16.8714 4.67139 16.5 4.67139C16.1286 4.67139 15.7608 4.74455 15.4176 4.88669C15.0744 5.02883 14.7626 5.23717 14.5 5.49981L4 15.9998V19.9998Z"
                stroke="#1760B2"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.5 6.5L17.5 10.5"
                stroke="#1760B2"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_40000010_7999">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        );
      case "started":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_40000010_8008)">
              <path
                d="M4 13C5.78309 13.2119 7.44305 14.0175 8.71276 15.2872C9.98247 16.557 10.7881 18.2169 11 20C11.8839 19.4904 12.6233 18.7638 13.1482 17.8889C13.6732 17.014 13.9663 16.0197 14 15C15.6791 14.4093 17.1454 13.334 18.2133 11.91C19.2813 10.486 19.9031 8.77734 20 7C20 6.20435 19.6839 5.44129 19.1213 4.87868C18.5587 4.31607 17.7956 4 17 4C15.2227 4.09691 13.514 4.71867 12.09 5.78665C10.666 6.85464 9.59069 8.32089 9 10C7.98026 10.0337 6.98596 10.3268 6.11106 10.8518C5.23617 11.3767 4.50959 12.1161 4 13Z"
                stroke="#C415B5"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.00048 14C5.95971 14.5876 5.11814 15.4726 4.58364 16.5416C4.04914 17.6106 3.84608 18.8148 4.00048 20C5.18564 20.1544 6.38991 19.9513 7.4589 19.4168C8.5279 18.8823 9.41291 18.0408 10.0005 17"
                stroke="#C415B5"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 9C14 9.26522 14.1054 9.51957 14.2929 9.70711C14.4804 9.89464 14.7348 10 15 10C15.2652 10 15.5196 9.89464 15.7071 9.70711C15.8946 9.51957 16 9.26522 16 9C16 8.73478 15.8946 8.48043 15.7071 8.29289C15.5196 8.10536 15.2652 8 15 8C14.7348 8 14.4804 8.10536 14.2929 8.29289C14.1054 8.48043 14 8.73478 14 9Z"
                stroke="#C415B5"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_40000010_8008">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        );
      case "delivered":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_208_18613)">
              <path
                d="M5 17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19C7.53043 19 8.03914 18.7893 8.41421 18.4142C8.78929 18.0391 9 17.5304 9 17C9 16.4696 8.78929 15.9609 8.41421 15.5858C8.03914 15.2107 7.53043 15 7 15C6.46957 15 5.96086 15.2107 5.58579 15.5858C5.21071 15.9609 5 16.4696 5 17Z"
                stroke="#063B26"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15 17C15 17.5304 15.2107 18.0391 15.5858 18.4142C15.9609 18.7893 16.4696 19 17 19C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17C19 16.4696 18.7893 15.9609 18.4142 15.5858C18.0391 15.2107 17.5304 15 17 15C16.4696 15 15.9609 15.2107 15.5858 15.5858C15.2107 15.9609 15 16.4696 15 17Z"
                stroke="#063B26"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5 17H3V13M2 5H13V17M9 17H15M19 17H21V11M21 11H13M21 11L18 6H13"
                stroke="#063B26"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3 9H7"
                stroke="#063B26"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_208_18613">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        );
      case "revision":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_208_18638)">
              <path
                d="M15.0001 4.54997C14.0217 4.15601 12.9754 3.9586 11.9207 3.96902C10.8661 3.97944 9.82384 4.19749 8.85347 4.61071C7.8831 5.02393 7.00362 5.62423 6.26524 6.37734C5.52687 7.13045 4.94406 8.02162 4.5501 8.99997C3.75445 10.9758 3.77629 13.1868 4.61083 15.1466C5.44537 17.1064 7.02423 18.6543 9.00009 19.45M9.00009 15V20H4.00009"
                stroke="#B03200"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.3701 7.15997V7.16997"
                stroke="#B03200"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13 19.94V19.95"
                stroke="#B03200"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.8398 18.37V18.38"
                stroke="#B03200"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19.3701 15.1V15.11"
                stroke="#B03200"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19.9404 11V11.01"
                stroke="#B03200"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_208_18638">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        );
      case "update":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_208_18660)">
              <path
                d="M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z"
                stroke="#54009A"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 12L10 15"
                stroke="#54009A"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 7V12"
                stroke="#54009A"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_208_18660">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clipPath="url(#clip0_status_default)">
              <path
                d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
                stroke="#4A7D06"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 12L20 7.5"
                stroke="#4A7D06"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 12V21"
                stroke="#4A7D06"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 12L4 7.5"
                stroke="#4A7D06"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 5.25L8 9.75"
                stroke="#4A7D06"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_status_default">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        );
    }
  };

  return (
    <div>
      <div className="OrderPlacedChat_continer">
        <div className="OrderPlacedChat_top">
          <div className="OrderPlacedChat_top_section_one">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clip-path="url(#clip0_40000010_8245)">
                <path
                  d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12C21 14.3869 20.0518 16.6761 18.364 18.364C16.6761 20.0518 14.3869 21 12 21Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 10C9.5 9 7.5 9 7 10"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17 10C16.5 9 14.5 9 14 10"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.5 15C14.1741 15.3326 13.7852 15.5968 13.3559 15.7772C12.9266 15.9576 12.4656 16.0505 12 16.0505C11.5344 16.0505 11.0734 15.9576 10.6441 15.7772C10.2148 15.5968 9.82588 15.3326 9.5 15"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_40000010_8245">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p className="OrderPlacedChat_top_section_one_topic">Team</p>
          </div>
          <div className="OrderPlacedChat_top_section_two">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="144"
              height="16"
              viewBox="0 0 144 16"
              fill="none"
            >
              <g clip-path="url(#clip0_40000010_8252)">
                <path
                  d="M72.0467 7.63342C72.0467 7.26099 72.0324 6.88856 72.0038 6.51614C71.9895 6.14371 71.968 5.77128 71.9395 5.39885H73.4619V6.92437H73.5048C73.8478 6.33708 74.3196 5.89304 74.92 5.59223C75.5346 5.29142 76.1422 5.14102 76.7426 5.14102C77.0142 5.14102 77.3001 5.16967 77.6003 5.22696C77.9148 5.28426 78.215 5.39169 78.5009 5.54926C78.7868 5.6925 79.0512 5.9002 79.2942 6.17236C79.5515 6.44452 79.766 6.79546 79.9375 7.22518C80.2234 6.5806 80.6737 6.07209 81.2884 5.69966C81.9174 5.32723 82.5678 5.14102 83.2397 5.14102C84.5262 5.14102 85.4768 5.4848 86.0915 6.17236C86.7062 6.84559 87.0135 7.81247 87.0135 9.073V15.4544H85.5983V9.58866C85.5983 8.57165 85.4196 7.79098 85.0623 7.24667C84.7049 6.70235 84.0402 6.43019 83.0681 6.43019C82.5392 6.43019 82.0961 6.53762 81.7387 6.75248C81.3813 6.95302 81.0883 7.22518 80.8595 7.56896C80.6451 7.91274 80.4879 8.30665 80.3878 8.7507C80.2877 9.18043 80.2377 9.63164 80.2377 10.1043V15.4544H78.8225V9.58866C78.8225 8.57165 78.6438 7.79098 78.2864 7.24667C77.9291 6.70235 77.2643 6.43019 76.2923 6.43019C76.2065 6.43019 76.0064 6.45884 75.6919 6.51614C75.3917 6.57343 75.0772 6.731 74.7484 6.98883C74.4196 7.24667 74.1194 7.63342 73.8478 8.14909C73.5905 8.66476 73.4619 9.38096 73.4619 10.2977V15.4544H72.0467V7.63342Z"
                  fill="white"
                  fill-opacity="0.7"
                />
                <path
                  d="M95.2615 10.4481C94.9042 10.4481 94.4539 10.4696 93.9107 10.5126C93.3817 10.5412 92.8671 10.6272 92.3668 10.7704C91.8808 10.8993 91.4591 11.107 91.1017 11.3935C90.7586 11.68 90.5871 12.0739 90.5871 12.5752C90.5871 12.9047 90.6514 13.1912 90.7801 13.4347C90.923 13.6639 91.1088 13.8573 91.3376 14.0148C91.5663 14.1581 91.8164 14.2655 92.088 14.3371C92.3739 14.3944 92.6598 14.4231 92.9457 14.4231C93.4604 14.4231 93.9035 14.3371 94.2752 14.1652C94.6611 13.9933 94.9828 13.7641 95.2401 13.4777C95.4974 13.1769 95.6832 12.8331 95.7976 12.4463C95.9263 12.0453 95.9906 11.6227 95.9906 11.1786V10.4481H95.2615ZM95.9906 9.28786V9.03002C95.9906 7.2968 95.1329 6.43019 93.4175 6.43019C92.2453 6.43019 91.2232 6.82411 90.3512 7.61193L89.4935 6.60208C90.437 5.62804 91.8522 5.14102 93.7391 5.14102C94.2252 5.14102 94.6897 5.21264 95.1329 5.35588C95.5903 5.49912 95.9834 5.72115 96.3122 6.02195C96.641 6.30844 96.9055 6.6737 97.1056 7.11775C97.3057 7.5618 97.4058 8.09179 97.4058 8.70773V13.1983C97.4058 13.5851 97.4201 13.9933 97.4487 14.4231C97.4916 14.8385 97.5344 15.1822 97.5773 15.4544H96.205C96.1621 15.2109 96.1264 14.9459 96.0978 14.6594C96.0835 14.3729 96.0764 14.0936 96.0764 13.8214H96.0335C95.6189 14.4947 95.1257 14.9817 94.5539 15.2825C93.9964 15.569 93.3103 15.7122 92.4955 15.7122C92.0523 15.7122 91.6235 15.6478 91.2089 15.5189C90.7943 15.4043 90.4227 15.2252 90.0939 14.9817C89.7794 14.7239 89.5221 14.4159 89.322 14.0578C89.1361 13.6854 89.0432 13.2556 89.0432 12.7686C89.0432 11.9521 89.2505 11.3147 89.665 10.8563C90.0939 10.3837 90.6228 10.0327 91.2518 9.80353C91.8951 9.57434 92.5741 9.4311 93.2888 9.3738C94.0179 9.3165 94.6826 9.28786 95.283 9.28786H95.9906Z"
                  fill="white"
                  fill-opacity="0.7"
                />
                <path
                  d="M101.279 5.39885C101.308 5.67101 101.322 5.94317 101.322 6.21533C101.337 6.47316 101.344 6.73816 101.344 7.01032H101.387C101.544 6.73816 101.744 6.48749 101.987 6.2583C102.23 6.02912 102.502 5.83574 102.802 5.67817C103.102 5.50629 103.416 5.37737 103.745 5.29142C104.088 5.19115 104.424 5.14102 104.753 5.14102C106.04 5.14102 106.99 5.4848 107.605 6.17236C108.22 6.84559 108.527 7.81247 108.527 9.073V15.4544H107.112V9.88947C107.112 8.77219 106.919 7.9199 106.533 7.33261C106.147 6.731 105.432 6.43019 104.389 6.43019C104.317 6.43019 104.117 6.45884 103.788 6.51614C103.459 6.57343 103.109 6.731 102.737 6.98883C102.38 7.24667 102.058 7.63342 101.773 8.14909C101.487 8.66476 101.344 9.38096 101.344 10.2977V15.4544H99.9285V7.61193C99.9285 7.33977 99.9142 6.996 99.8856 6.5806C99.8713 6.1652 99.8498 5.77128 99.8213 5.39885H101.279Z"
                  fill="white"
                  fill-opacity="0.7"
                />
                <path
                  d="M116.413 7.78382C116.198 7.36842 115.912 7.03897 115.555 6.79546C115.197 6.55195 114.762 6.43019 114.247 6.43019C114.004 6.43019 113.754 6.45884 113.496 6.51614C113.253 6.57343 113.032 6.66654 112.832 6.79546C112.632 6.91005 112.467 7.06045 112.338 7.24667C112.224 7.43288 112.167 7.66207 112.167 7.93423C112.167 8.40692 112.331 8.7507 112.66 8.96556C112.989 9.18043 113.482 9.36664 114.14 9.52421L115.576 9.86798C116.277 10.0255 116.856 10.3478 117.313 10.8349C117.785 11.3076 118.021 11.902 118.021 12.6182C118.021 13.1625 117.906 13.6352 117.678 14.0363C117.463 14.4231 117.17 14.7454 116.799 15.0032C116.441 15.2467 116.027 15.4257 115.555 15.5403C115.083 15.6549 114.604 15.7122 114.118 15.7122C113.346 15.7122 112.624 15.569 111.953 15.2825C111.295 14.9817 110.73 14.4732 110.259 13.757L111.481 12.919C111.767 13.3774 112.124 13.7427 112.553 14.0148C112.996 14.287 113.518 14.4231 114.118 14.4231C114.404 14.4231 114.69 14.3944 114.976 14.3371C115.262 14.2655 115.512 14.1652 115.726 14.0363C115.955 13.8931 116.134 13.714 116.262 13.4992C116.405 13.2843 116.477 13.0336 116.477 12.7471C116.477 12.2458 116.291 11.8877 115.919 11.6728C115.548 11.4436 115.097 11.2646 114.569 11.1357L113.196 10.8134C113.025 10.7704 112.789 10.6988 112.489 10.5985C112.203 10.4982 111.917 10.3478 111.631 10.1473C111.359 9.94677 111.123 9.68893 110.923 9.3738C110.723 9.04435 110.623 8.64327 110.623 8.17057C110.623 7.65491 110.723 7.20369 110.923 6.81694C111.138 6.43019 111.416 6.11506 111.76 5.87155C112.117 5.62804 112.517 5.44899 112.96 5.3344C113.403 5.20548 113.861 5.14102 114.333 5.14102C115.033 5.14102 115.684 5.2771 116.284 5.54926C116.884 5.82142 117.349 6.28695 117.678 6.94586L116.413 7.78382Z"
                  fill="white"
                  fill-opacity="0.7"
                />
                <path
                  d="M121.535 1.53134C121.535 1.83214 121.427 2.08282 121.213 2.28335C120.999 2.46957 120.763 2.56268 120.505 2.56268C120.248 2.56268 120.012 2.46957 119.798 2.28335C119.583 2.08282 119.476 1.83214 119.476 1.53134C119.476 1.23053 119.583 0.987021 119.798 0.800807C120.012 0.600269 120.248 0.5 120.505 0.5C120.763 0.5 120.999 0.600269 121.213 0.800807C121.427 0.987021 121.535 1.23053 121.535 1.53134ZM121.213 15.4544H119.798V5.39885H121.213V15.4544Z"
                  fill="white"
                  fill-opacity="0.7"
                />
                <path
                  d="M132.477 10.4266C132.477 9.86798 132.384 9.34515 132.199 8.85813C132.027 8.37111 131.777 7.94855 131.448 7.59045C131.119 7.23234 130.719 6.95302 130.247 6.75248C129.79 6.53762 129.268 6.43019 128.682 6.43019C128.096 6.43019 127.567 6.53762 127.095 6.75248C126.638 6.95302 126.245 7.23234 125.916 7.59045C125.601 7.94855 125.351 8.37111 125.165 8.85813C124.994 9.34515 124.908 9.86798 124.908 10.4266C124.908 10.9853 124.994 11.5081 125.165 11.9951C125.351 12.4821 125.601 12.9047 125.916 13.2628C126.245 13.6209 126.638 13.9074 127.095 14.1223C127.567 14.3228 128.096 14.4231 128.682 14.4231C129.268 14.4231 129.79 14.3228 130.247 14.1223C130.719 13.9074 131.119 13.6209 131.448 13.2628C131.777 12.9047 132.027 12.4821 132.199 11.9951C132.384 11.5081 132.477 10.9853 132.477 10.4266ZM134.021 10.4266C134.021 11.1858 133.885 11.8877 133.614 12.5323C133.357 13.1769 132.992 13.7355 132.52 14.2082C132.049 14.6809 131.484 15.0533 130.826 15.3255C130.183 15.5833 129.468 15.7122 128.682 15.7122C127.91 15.7122 127.195 15.5833 126.538 15.3255C125.895 15.0533 125.337 14.6809 124.865 14.2082C124.394 13.7355 124.022 13.1769 123.75 12.5323C123.493 11.8877 123.364 11.1858 123.364 10.4266C123.364 9.66745 123.493 8.96556 123.75 8.32098C124.022 7.67639 124.394 7.11775 124.865 6.64505C125.337 6.17236 125.895 5.80709 126.538 5.54926C127.195 5.2771 127.91 5.14102 128.682 5.14102C129.468 5.14102 130.183 5.2771 130.826 5.54926C131.484 5.80709 132.049 6.17236 132.52 6.64505C132.992 7.11775 133.357 7.67639 133.614 8.32098C133.885 8.96556 134.021 9.66745 134.021 10.4266Z"
                  fill="white"
                  fill-opacity="0.7"
                />
                <path
                  d="M137.192 5.39885C137.22 5.67101 137.235 5.94317 137.235 6.21533C137.249 6.47316 137.256 6.73816 137.256 7.01032H137.299C137.456 6.73816 137.656 6.48749 137.899 6.2583C138.143 6.02912 138.414 5.83574 138.714 5.67817C139.014 5.50629 139.329 5.37737 139.658 5.29142C140.001 5.19115 140.337 5.14102 140.666 5.14102C141.952 5.14102 142.903 5.4848 143.517 6.17236C144.132 6.84559 144.439 7.81247 144.439 9.073V15.4544H143.024V9.88947C143.024 8.77219 142.831 7.9199 142.445 7.33261C142.059 6.731 141.345 6.43019 140.301 6.43019C140.23 6.43019 140.029 6.45884 139.701 6.51614C139.372 6.57343 139.022 6.731 138.65 6.98883C138.293 7.24667 137.971 7.63342 137.685 8.14909C137.399 8.66476 137.256 9.38096 137.256 10.2977V15.4544H135.841V7.61193C135.841 7.33977 135.827 6.996 135.798 6.5806C135.784 6.1652 135.762 5.77128 135.734 5.39885H137.192Z"
                  fill="white"
                  fill-opacity="0.7"
                />
                <path
                  d="M6.99692 0.5C6.99692 0.223858 7.22068 0 7.4967 0H9.49582C9.77184 0 9.9956 0.223858 9.9956 0.5V3C9.9956 3.27614 9.77184 3.5 9.49582 3.5H3.49846V15.5H0V2H6.99692V0.5Z"
                  fill="white"
                  fill-opacity="0.7"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.74329 11.2001C8.8292 11.9736 9.12987 12.5753 9.64531 13.005C10.1608 13.4347 10.7836 13.6496 11.5138 13.6496C12.1581 13.6496 12.695 13.5207 13.1245 13.2628C13.5684 12.9907 13.955 12.654 14.2843 12.253L16.1313 13.6496C15.5299 14.3944 14.857 14.9244 14.1125 15.2395C13.368 15.5547 12.5876 15.7122 11.7715 15.7122C10.9983 15.7122 10.2681 15.5833 9.58088 15.3255C8.89363 15.0677 8.29944 14.7024 7.79831 14.2297C7.29719 13.757 6.89629 13.1912 6.59561 12.5323C6.30926 11.8591 6.16608 11.1142 6.16608 10.2977C6.16608 9.48124 6.30926 8.74355 6.59561 8.08464C6.89629 7.41141 7.29719 6.83844 7.79831 6.36574C8.29944 5.89305 8.89363 5.52778 9.58088 5.26995C10.2681 5.01211 10.9983 4.88319 11.7715 4.88319C12.4874 4.88319 13.1389 5.01211 13.7259 5.26995C14.3272 5.51346 14.8355 5.87156 15.2507 6.34426C15.6803 6.81695 16.0096 7.40424 16.2387 8.10613C16.4821 8.79369 16.6038 9.58868 16.6038 10.4911V11.2001H8.74329ZM14.0266 9.26638C14.0123 8.5072 13.776 7.91275 13.3178 7.48303C12.8597 7.03898 12.2225 6.81695 11.4064 6.81695C10.6332 6.81695 10.0176 7.03898 9.55941 7.48303C9.11555 7.92707 8.84351 8.52153 8.74329 9.26638H14.0266Z"
                  fill="white"
                  fill-opacity="0.7"
                />
                <path
                  d="M23.7623 7.9987C23.2611 7.29681 22.5882 6.94587 21.7434 6.94587C21.3998 6.94587 21.0633 7.03182 20.734 7.20371C20.4047 7.3756 20.2401 7.65492 20.2401 8.04167C20.2401 8.3568 20.3761 8.58599 20.6481 8.72923C20.9202 8.87247 21.2638 8.99422 21.679 9.09449C22.0942 9.19476 22.5381 9.30219 23.0106 9.41679C23.4974 9.51705 23.9484 9.68178 24.3636 9.91097C24.7788 10.1258 25.1225 10.4266 25.3945 10.8134C25.6665 11.2001 25.8025 11.7301 25.8025 12.4034C25.8025 13.0193 25.6665 13.5421 25.3945 13.9719C25.1368 14.3873 24.7931 14.7239 24.3636 14.9817C23.9484 15.2395 23.4759 15.4258 22.9461 15.5404C22.4164 15.655 21.8866 15.7122 21.3569 15.7122C20.5551 15.7122 19.8177 15.5977 19.1448 15.3685C18.4718 15.1393 17.8705 14.7239 17.3407 14.1223L19.0588 12.5108C19.3882 12.8832 19.7389 13.1912 20.1112 13.4347C20.4978 13.6639 20.9631 13.7785 21.5072 13.7785C21.6933 13.7785 21.8866 13.757 22.0871 13.714C22.2875 13.6711 22.4736 13.5994 22.6455 13.4992C22.8173 13.3989 22.9533 13.2771 23.0535 13.1339C23.1681 12.9763 23.2253 12.7973 23.2253 12.5967C23.2253 12.2386 23.0893 11.9736 22.8173 11.8018C22.5452 11.6299 22.2016 11.4938 21.7864 11.3935C21.3712 11.2789 20.9202 11.1787 20.4334 11.0927C19.9609 10.9924 19.517 10.842 19.1018 10.6415C18.6866 10.4266 18.343 10.133 18.0709 9.76056C17.7989 9.38814 17.6629 8.87247 17.6629 8.21356C17.6629 7.64059 17.7774 7.14641 18.0065 6.73101C18.2499 6.30128 18.5649 5.95034 18.9515 5.67818C19.338 5.40603 19.7819 5.20549 20.283 5.07657C20.7841 4.94765 21.2924 4.88319 21.8079 4.88319C22.4951 4.88319 23.1752 5.00495 23.8482 5.24846C24.5211 5.47765 25.0652 5.87872 25.4804 6.45169L23.7623 7.9987Z"
                  fill="white"
                  fill-opacity="0.7"
                />
                <path
                  d="M34.0159 15.4544H36.4642V5.14103H33.887V10.7704C33.887 11.1142 33.8441 11.4437 33.7582 11.7588C33.6723 12.0739 33.5291 12.3532 33.3286 12.5967C33.1425 12.8403 32.8991 13.0336 32.5984 13.1769C32.3121 13.3201 31.9541 13.3917 31.5246 13.3917C31.0664 13.3917 30.7085 13.2915 30.4508 13.0909C30.2074 12.8761 30.0212 12.6182 29.8924 12.3174C29.7778 12.0023 29.7062 11.6728 29.6776 11.3291C29.649 10.971 29.6346 10.6487 29.6346 10.3622V5.14103H27.0574V11.6514C27.0574 12.1813 27.1219 12.6899 27.2507 13.1769C27.3796 13.6639 27.5943 14.1008 27.895 14.4875C28.1957 14.86 28.5823 15.1608 29.0548 15.39C29.5416 15.6048 30.1286 15.7122 30.8159 15.7122C31.6749 15.7122 32.355 15.526 32.8562 15.1536C33.3573 14.7669 33.7295 14.3156 33.9729 13.8H34.0159V15.4544Z"
                  fill="white"
                  fill-opacity="0.7"
                />
                <path
                  d="M38.5327 5.14103H40.9811V6.75249H41.024C41.2531 6.26547 41.6182 5.83575 42.1193 5.46332C42.6348 5.07657 43.322 4.88319 44.1811 4.88319C45.799 4.88319 46.8729 5.52062 47.4026 6.79547C47.7749 6.13656 48.2402 5.6567 48.7986 5.35589C49.357 5.04076 50.0228 4.88319 50.796 4.88319C51.4832 4.88319 52.0631 4.99779 52.5356 5.22697C53.0081 5.45616 53.3875 5.77129 53.6738 6.17237C53.9745 6.57344 54.1893 7.04614 54.3181 7.59046C54.447 8.12045 54.5114 8.69342 54.5114 9.30935V15.4544H51.9342V9.61016C51.9342 9.29503 51.9056 8.99422 51.8483 8.70774C51.791 8.40693 51.6908 8.1491 51.5476 7.93424C51.4045 7.70505 51.2112 7.526 50.9678 7.39708C50.7244 7.26816 50.4094 7.20371 50.0228 7.20371C49.6219 7.20371 49.2783 7.28249 48.9919 7.44005C48.7199 7.5833 48.4908 7.78383 48.3047 8.04167C48.1328 8.28518 48.004 8.57166 47.9181 8.90112C47.8465 9.21625 47.8107 9.53854 47.8107 9.868V15.4544H45.2335V9.30935C45.2335 8.66477 45.0975 8.15626 44.8254 7.78383C44.5534 7.39708 44.1024 7.20371 43.4724 7.20371C43.0428 7.20371 42.6777 7.27533 42.3771 7.41857C42.0907 7.56181 41.8473 7.75518 41.6469 7.9987C41.4607 8.24221 41.3247 8.52153 41.2388 8.83666C41.1529 9.15179 41.1099 9.48124 41.1099 9.82502V15.4544H38.5327V5.14103Z"
                  fill="white"
                  fill-opacity="0.7"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M59.5415 13.005C59.0261 12.5753 58.7254 11.9736 58.6395 11.2001H66.5V10.4911C66.5 9.58868 66.3783 8.79369 66.1349 8.10613C65.9058 7.40424 65.5765 6.81695 65.147 6.34426C64.7317 5.87156 64.2235 5.51346 63.6221 5.26995C63.0351 5.01211 62.3836 4.88319 61.6677 4.88319C60.8946 4.88319 60.1644 5.01211 59.4771 5.26995C58.7898 5.52778 58.1957 5.89305 57.6945 6.36574C57.1934 6.83844 56.7925 7.41141 56.4918 8.08464C56.2055 8.74355 56.0623 9.48124 56.0623 10.2977C56.0623 11.1142 56.2055 11.8591 56.4918 12.5323C56.7925 13.1912 57.1934 13.757 57.6945 14.2297C58.1957 14.7024 58.7898 15.0677 59.4771 15.3255C60.1644 15.5833 60.8946 15.7122 61.6677 15.7122C62.4838 15.7122 63.2642 15.5547 64.0087 15.2395C64.7532 14.9244 65.4262 14.3944 66.0275 13.6496L64.1805 12.253C63.8512 12.654 63.4646 12.9907 63.0208 13.2628C62.5912 13.5207 62.0543 13.6496 61.41 13.6496C60.6798 13.6496 60.057 13.4347 59.5415 13.005ZM63.2141 7.48303C63.6722 7.91275 63.9085 8.5072 63.9228 9.26638H58.6395C58.7397 8.52153 59.0118 7.92707 59.4556 7.48303C59.9138 7.03898 60.5295 6.81695 61.3026 6.81695C62.1187 6.81695 62.7559 7.03898 63.2141 7.48303Z"
                  fill="white"
                  fill-opacity="0.7"
                />
              </g>
              <defs>
                <clipPath id="clip0_40000010_8252">
                  <rect width="144" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>

        <div
          className="OrderPlacedChat_section_scroll_continer"
          ref={chatContainerRef}
        >
          {loading && <Loader />}
          <div className="OrderPlacedChat_section_continer">
            {orderData && (
              <div className="OrderPlacedChat_section_one">
                <div className="OrderPlacedChat_section_one_icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_40000010_7846)">
                      <path
                        d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
                        stroke="#4A7D06"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 12L20 7.5"
                        stroke="#4A7D06"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 12V21"
                        stroke="#4A7D06"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 12L4 7.5"
                        stroke="#4A7D06"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M16 5.25L8 9.75"
                        stroke="#4A7D06"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_40000010_7846">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <p className="OrderPlacedChat_section_one_topic">
                  You placed the order
                </p>
                <p className="OrderPlacedChat_section_one_date">now</p>
              </div>
            )}
            <div className="OrderPlacedChat_section_two">
              <div className="order_line"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M7.65712 1.3335L7.73579 1.33816L7.77513 1.3435L7.81579 1.35216L7.88979 1.37483C7.9409 1.39367 7.98949 1.41875 8.03446 1.4495L8.10379 1.50416L8.27379 1.6495C9.61867 2.76654 11.3184 3.36636 13.0665 3.34083L13.2945 3.33416C13.4435 3.32736 13.5906 3.37077 13.712 3.45743C13.8335 3.54409 13.9224 3.669 13.9645 3.81216C14.2921 4.92655 14.3923 6.09542 14.2592 7.24931C14.1262 8.4032 13.7625 9.51857 13.1899 10.5291C12.6172 11.5397 11.8473 12.4249 10.9258 13.132C10.0043 13.8391 8.95012 14.3538 7.82579 14.6455C7.71605 14.674 7.60087 14.674 7.49112 14.6455C6.36674 14.3539 5.31244 13.8393 4.39088 13.1322C3.46932 12.4251 2.69931 11.5399 2.12661 10.5293C1.5539 9.51876 1.19019 8.40336 1.05709 7.24943C0.923984 6.0955 1.0242 4.92659 1.35179 3.81216C1.39386 3.669 1.48275 3.54409 1.60422 3.45743C1.72569 3.37077 1.87273 3.32736 2.02179 3.33416C3.84677 3.41759 5.63717 2.81682 7.04246 1.6495L7.21779 1.4995L7.28179 1.4495C7.32676 1.41875 7.37535 1.39367 7.42646 1.37483L7.50112 1.35216C7.52725 1.34585 7.55375 1.34118 7.58046 1.33816L7.65712 1.3335ZM10.1305 6.1955C10.0685 6.13351 9.99502 6.08434 9.91409 6.05079C9.83315 6.01724 9.7464 5.99997 9.65879 5.99997C9.57118 5.99997 9.48443 6.01724 9.4035 6.05079C9.32257 6.08434 9.24904 6.13351 9.18713 6.1955L6.99179 8.39016L6.12979 7.52883L6.06712 7.4735C5.93313 7.36989 5.76472 7.32117 5.59611 7.33723C5.42749 7.35329 5.27131 7.43293 5.15929 7.55998C5.04727 7.68702 4.9878 7.85194 4.99297 8.02124C4.99814 8.19054 5.06756 8.35152 5.18712 8.4715L6.52046 9.80483L6.58313 9.86016C6.71139 9.95966 6.87156 10.0089 7.03358 9.99876C7.1956 9.98857 7.34833 9.91961 7.46312 9.80483L10.1298 7.13816L10.1851 7.0755C10.2846 6.94723 10.3339 6.78706 10.3237 6.62504C10.3135 6.46302 10.2446 6.31029 10.1298 6.1955H10.1305Z"
                  fill="#051D14"
                />
              </svg>
              <p className="OrderPlacedChat_section_two_topic">
                WE HAVE YOUR BACK
              </p>
              <div className="order_line"></div>
            </div>
            {/* Show requirements section if requirements not submitted yet */}
            <div className="OrderPlacedChat_section_three chat_resivebox">
              <p className="OrderPlacedChat_section_three_topic">
                Please submit the requirements below to get the job started
              </p>
              <div className="OrderPlacedChat_section_three_data">
                <p className="OrderPlacedChat_section_three_data_topic">
                  <b>A.</b> Your target job title
                </p>
                <p className="OrderPlacedChat_section_three_data_pera">
                  (Place separate orders if you are targeting multiple
                  industries)
                </p>
              </div>
              <div className="OrderPlacedChat_section_three_data">
                <p className="OrderPlacedChat_section_three_data_topic">
                  <b>B.</b> Work experience
                </p>
                <p className="OrderPlacedChat_section_three_data_pera">
                  1. Company
                </p>
                <p className="OrderPlacedChat_section_three_data_pera">
                  2. Position
                </p>
                <p className="OrderPlacedChat_section_three_data_pera">
                  3. Period
                </p>
              </div>
              <div className="OrderPlacedChat_section_three_data">
                <p className="OrderPlacedChat_section_three_data_topic">
                  <b>C.</b> Personal details
                </p>
                <p className="OrderPlacedChat_section_three_data_pera">
                  1. Address
                </p>
                <p className="OrderPlacedChat_section_three_data_pera">
                  2. Phone
                </p>
                <p className="OrderPlacedChat_section_three_data_pera">
                  3. Email
                </p>
              </div>
              <div className="OrderPlacedChat_section_three_data">
                <p className="OrderPlacedChat_section_three_data_topic">
                  <b>D.</b> Education details
                </p>
                <p className="OrderPlacedChat_section_three_data_pera">
                  1. College/school/university
                </p>
                <p className="OrderPlacedChat_section_three_data_pera">
                  2. Course
                </p>
                <p className="OrderPlacedChat_section_three_data_pera">
                  3. Year
                </p>
              </div>
              <div className="OrderPlacedChat_section_three_data">
                <p className="OrderPlacedChat_section_three_data_topic">
                  <b>E.</b> Your current CV/Resume (If you have one)
                </p>
              </div>
              <p className="OrderPlacedChat_section_three_data_sub_topic">
                Copy this template to your clip board
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g clip-path="url(#clip0_40000010_7890)">
                    <path
                      d="M5.83301 8.056C5.83301 7.46655 6.06716 6.90125 6.48396 6.48445C6.90076 6.06765 7.46606 5.8335 8.05551 5.8335H15.2772C15.569 5.8335 15.858 5.89098 16.1277 6.00267C16.3973 6.11437 16.6423 6.27807 16.8487 6.48445C17.0551 6.69083 17.2188 6.93584 17.3305 7.20548C17.4422 7.47513 17.4997 7.76413 17.4997 8.056V15.2777C17.4997 15.5695 17.4422 15.8585 17.3305 16.1282C17.2188 16.3978 17.0551 16.6428 16.8487 16.8492C16.6423 17.0556 16.3973 17.2193 16.1277 17.331C15.858 17.4427 15.569 17.5002 15.2772 17.5002H8.05551C7.76365 17.5002 7.47464 17.4427 7.20499 17.331C6.93535 17.2193 6.69034 17.0556 6.48396 16.8492C6.27758 16.6428 6.11388 16.3978 6.00219 16.1282C5.89049 15.8585 5.83301 15.5695 5.83301 15.2777V8.056Z"
                      stroke="#0D5438"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3.34333 13.9475C3.08779 13.8018 2.87523 13.5912 2.72715 13.3371C2.57906 13.0829 2.50071 12.7942 2.5 12.5V4.16667C2.5 3.25 3.25 2.5 4.16667 2.5H12.5C13.125 2.5 13.465 2.82083 13.75 3.33333"
                      stroke="#0D5438"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_40000010_7890">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </p>
            </div>
            <p className="new_user_conect">Admin connected to the chat</p>
            {/*Receive msg */}
            <div className="Receive_msg_con">
              <div className="chat_resivebox">
                <p className="resive_msg">
                  Thank you for choosing Resume Mansion! We've received your
                  order and are currently reviewing the details. If you have any
                  questions or need further assistance, please don't hesitate to
                  reach out. We're here to help you every step of the way!
                  Looking forward to working with you!
                </p>
              </div>
              <div className="sender_box">
                <div className="auther_continer_blog_card">
                  <img
                    src={Avatar}
                    alt="avatar_image"
                    className="avatar_card_blog"
                  />
                  <div className="auther_data_set">
                    <p className="avatar_name_blog">Admin</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="Receive_msg_con">
              <div className="chat_resivebox">
                <p className="resive_msg">
                  Please tell us your preferred template for your resume. We
                  recommend options A and B for the best impact!
                </p>
              </div>
              <div className="chat_resivebox">
                <div className="cv_template_con">
                  <div
                    className="cv_template_boxone"
                    style={getBackgroundImage(0)}
                    onClick={() => openModal(0)}
                  >
                    <p className="cv_template_box_num">A</p>
                    <div className="cv_template_box_zome">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_331_33125)">
                          <path
                            d="M2.5 8.33333C2.5 9.09938 2.65088 9.85792 2.94404 10.5657C3.23719 11.2734 3.66687 11.9164 4.20854 12.4581C4.75022 12.9998 5.39328 13.4295 6.10101 13.7226C6.80875 14.0158 7.56729 14.1667 8.33333 14.1667C9.09938 14.1667 9.85792 14.0158 10.5657 13.7226C11.2734 13.4295 11.9164 12.9998 12.4581 12.4581C12.9998 11.9164 13.4295 11.2734 13.7226 10.5657C14.0158 9.85792 14.1667 9.09938 14.1667 8.33333C14.1667 7.56729 14.0158 6.80875 13.7226 6.10101C13.4295 5.39328 12.9998 4.75022 12.4581 4.20854C11.9164 3.66687 11.2734 3.23719 10.5657 2.94404C9.85792 2.65088 9.09938 2.5 8.33333 2.5C7.56729 2.5 6.80875 2.65088 6.10101 2.94404C5.39328 3.23719 4.75022 3.66687 4.20854 4.20854C3.66687 4.75022 3.23719 5.39328 2.94404 6.10101C2.65088 6.80875 2.5 7.56729 2.5 8.33333Z"
                            stroke="black"
                            stroke-width="1.66667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5.83398 8.33301H10.834"
                            stroke="black"
                            stroke-width="1.66667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8.33398 5.83301V10.833"
                            stroke="black"
                            stroke-width="1.66667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M17.5 17.5L12.5 12.5"
                            stroke="black"
                            stroke-width="1.66667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_331_33125">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <div
                    className="cv_template_boxtwo"
                    style={getBackgroundImage(1)}
                    onClick={() => openModal(1)}
                  >
                    <p className="cv_template_box_num">B</p>
                    <div className="cv_template_box_zome">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_331_33125)">
                          <path
                            d="M2.5 8.33333C2.5 9.09938 2.65088 9.85792 2.94404 10.5657C3.23719 11.2734 3.66687 11.9164 4.20854 12.4581C4.75022 12.9998 5.39328 13.4295 6.10101 13.7226C6.80875 14.0158 7.56729 14.1667 8.33333 14.1667C9.09938 14.1667 9.85792 14.0158 10.5657 13.7226C11.2734 13.4295 11.9164 12.9998 12.4581 12.4581C12.9998 11.9164 13.4295 11.2734 13.7226 10.5657C14.0158 9.85792 14.1667 9.09938 14.1667 8.33333C14.1667 7.56729 14.0158 6.80875 13.7226 6.10101C13.4295 5.39328 12.9998 4.75022 12.4581 4.20854C11.9164 3.66687 11.2734 3.23719 10.5657 2.94404C9.85792 2.65088 9.09938 2.5 8.33333 2.5C7.56729 2.5 6.80875 2.65088 6.10101 2.94404C5.39328 3.23719 4.75022 3.66687 4.20854 4.20854C3.66687 4.75022 3.23719 5.39328 2.94404 6.10101C2.65088 6.80875 2.5 7.56729 2.5 8.33333Z"
                            stroke="black"
                            stroke-width="1.66667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5.83398 8.33301H10.834"
                            stroke="black"
                            stroke-width="1.66667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8.33398 5.83301V10.833"
                            stroke="black"
                            stroke-width="1.66667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M17.5 17.5L12.5 12.5"
                            stroke="black"
                            stroke-width="1.66667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_331_33125">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <div
                    className="cv_template_boxthree"
                    style={getBackgroundImage(2)}
                    onClick={() => openModal(2)}
                  >
                    <p className="cv_template_box_num">C</p>
                    <div className="cv_template_box_zome">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_331_33125)">
                          <path
                            d="M2.5 8.33333C2.5 9.09938 2.65088 9.85792 2.94404 10.5657C3.23719 11.2734 3.66687 11.9164 4.20854 12.4581C4.75022 12.9998 5.39328 13.4295 6.10101 13.7226C6.80875 14.0158 7.56729 14.1667 8.33333 14.1667C9.09938 14.1667 9.85792 14.0158 10.5657 13.7226C11.2734 13.4295 11.9164 12.9998 12.4581 12.4581C12.9998 11.9164 13.4295 11.2734 13.7226 10.5657C14.0158 9.85792 14.1667 9.09938 14.1667 8.33333C14.1667 7.56729 14.0158 6.80875 13.7226 6.10101C13.4295 5.39328 12.9998 4.75022 12.4581 4.20854C11.9164 3.66687 11.2734 3.23719 10.5657 2.94404C9.85792 2.65088 9.09938 2.5 8.33333 2.5C7.56729 2.5 6.80875 2.65088 6.10101 2.94404C5.39328 3.23719 4.75022 3.66687 4.20854 4.20854C3.66687 4.75022 3.23719 5.39328 2.94404 6.10101C2.65088 6.80875 2.5 7.56729 2.5 8.33333Z"
                            stroke="black"
                            stroke-width="1.66667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5.83398 8.33301H10.834"
                            stroke="black"
                            stroke-width="1.66667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8.33398 5.83301V10.833"
                            stroke="black"
                            stroke-width="1.66667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M17.5 17.5L12.5 12.5"
                            stroke="black"
                            stroke-width="1.66667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_331_33125">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>

                  {isModalOpen && (
                    <div className="main_model_con_cv">
                      <div className="modal-overlay_close" onClick={closeModal}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_331_34992)">
                            <path
                              d="M24 8L8 24"
                              stroke="black"
                              stroke-width="2.66667"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M8 8L24 24"
                              stroke="black"
                              stroke-width="2.66667"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_331_34992">
                              <rect width="32" height="32" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className="modal_chat_bot">
                        <p className="template_name_cv">
                          {images[currentImageIndex].name}
                        </p>
                        <div className="modal_sub">
                          <div className="modal-content">
                            <button
                              className="chat_model_arrow left_arrow_chat norml_type_chat_btn"
                              onClick={() => navigateImage("prev")}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                              >
                                <mask
                                  id="mask0_331_34978"
                                  maskUnits="userSpaceOnUse"
                                  x="0"
                                  y="0"
                                  width="30"
                                  height="30"
                                >
                                  <path d="M0 30H30V0H0V30Z" fill="white" />
                                </mask>
                                <g mask="url(#mask0_331_34978)">
                                  <path
                                    d="M11.25 23.75L13.0125 21.9875L7.2875 16.25H27.5V13.75H7.2875L13.025 8.0125L11.25 6.25L2.5 15L11.25 23.75Z"
                                    fill="white"
                                  />
                                </g>
                              </svg>
                            </button>

                            {templatesLoading ? (
                              <div className="template-loading">
                                Loading templates...
                              </div>
                            ) : !templateImages[currentImageIndex] ||
                              !templateImages[currentImageIndex].src ? (
                              <div className="template-error">
                                Template image not available
                              </div>
                            ) : (
                              <img
                                src={templateImages[currentImageIndex].src}
                                alt={templateImages[currentImageIndex].name}
                                className="model_image_chat"
                              />
                            )}

                            <button
                              className="chat_model_arrow right_arrow_chat norml_type_chat_btn"
                              onClick={() => navigateImage("next")}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                              >
                                <mask
                                  id="mask0_331_34985"
                                  maskUnits="userSpaceOnUse"
                                  x="0"
                                  y="0"
                                  width="30"
                                  height="30"
                                >
                                  <path d="M30 30H0V0H30V30Z" fill="white" />
                                </mask>
                                <g mask="url(#mask0_331_34985)">
                                  <path
                                    d="M18.75 23.75L16.9875 21.9875L22.7125 16.25H2.5V13.75H22.7125L16.975 8.0125L18.75 6.25L27.5 15L18.75 23.75Z"
                                    fill="white"
                                  />
                                </g>
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="res_type_chat_btn">
                          <button
                            className="chat_model_arrow_res left_arrow_chat_res"
                            onClick={() => navigateImage("prev")}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                            >
                              <mask
                                id="mask0_331_34978"
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="30"
                                height="30"
                              >
                                <path d="M0 30H30V0H0V30Z" fill="white" />
                              </mask>
                              <g mask="url(#mask0_331_34978)">
                                <path
                                  d="M11.25 23.75L13.0125 21.9875L7.2875 16.25H27.5V13.75H7.2875L13.025 8.0125L11.25 6.25L2.5 15L11.25 23.75Z"
                                  fill="white"
                                />
                              </g>
                            </svg>
                          </button>
                          <button
                            className="chat_model_arrow_res right_arrow_chat_res"
                            onClick={() => navigateImage("next")}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                            >
                              <mask
                                id="mask0_331_34985"
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="30"
                                height="30"
                              >
                                <path d="M30 30H0V0H30V30Z" fill="white" />
                              </mask>
                              <g mask="url(#mask0_331_34985)">
                                <path
                                  d="M18.75 23.75L16.9875 21.9875L22.7125 16.25H2.5V13.75H22.7125L16.975 8.0125L18.75 6.25L27.5 15L18.75 23.75Z"
                                  fill="white"
                                />
                              </g>
                            </svg>
                          </button>
                        </div>
                        <button
                          onClick={() =>
                            (window.location.href = "/currentOrder")
                          }
                          className="back_chat_btn"
                        >
                          Back to chat
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="sender_box">
                <div className="auther_continer_blog_card">
                  <img
                    src={Avatar}
                    alt="avatar_image"
                    className="avatar_card_blog"
                  />
                  <div className="auther_data_set">
                    <p className="avatar_name_blog">Admin</p>
                    {/* <p className="avatar_date">Oct 02, 7:38 PM</p> */}
                  </div>
                </div>
              </div>
            </div>

            {getCombinedMessages().map((item, index) =>
              item.type === "status" ? (
                <div key={`status-${index}`} className="order_status_card">
                  <div className={`order_status_card_icon_${item.icon}`}>
                    {getStatusIcon(item.statusType)}
                  </div>
                  <p className="order_status_card_title">{item.title}</p>
                  <p className="order_status_card_date">
                    {item.apiDate
                      ? formatDate(item.apiDate)
                      : item.created_at
                      ? formatDate(item.created_at)
                      : "N/A"}
                  </p>
                </div>
              ) : item.sender_type === "admin" ? (
                <div key={`msg-${index}`} className="Receive_msg_con">
                  <div className="chat_resivebox">
                    <p className="resive_msg">{item.message}</p>

                    {/* Attachments rendering */}
                    {item.attachments &&
                      item.attachments.length > 0 &&
                      item.attachments.map((attachment, idx) => (
                        <div key={idx} className="doc_card_cv">
                          <div className="doc_name_card_type">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="23"
                              height="24"
                              viewBox="0 0 23 24"
                              fill="none"
                            >
                              {/* File icon SVG */}
                            </svg>
                          </div>
                          <p className="doc_name_card">
                            {attachment.file_name}
                          </p>
                          <div className="doc_name_card_dwon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              {/* Download icon SVG */}
                            </svg>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="sender_box">
                    <div className="auther_continer_blog_card">
                      <img
                        src={Avatar}
                        alt="avatar_image"
                        className="avatar_card_blog"
                      />
                      <div className="auther_data_set">
                        <p className="avatar_name_blog">
                          {item.sender_name ||
                            orderData.admin_name ||
                            "Team Member"}
                        </p>
                        <p className="avatar_date">
                          {formatDate(item.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={`msg-${index}`} className="send_msg_con">
                  <div className="send_msg_box">
                    <p className="resive_msg">{item.message}</p>
                  </div>

                  {/* Attachments rendering */}
                  {item.attachments && item.attachments.length > 0 && (
                    <div className="cv_send">
                      {item.attachments.map((attachment, idx) => (
                        <div key={idx} className="send_box_cv">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            {/* Attachment icon SVG */}
                          </svg>
                          <p className="cv_name">{attachment.file_name}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="sender_box">
                    <div className="auther_continer_blog_card_chat">
                      <div className="auther_data_set">
                        <p className="avatar_name_blog">You</p>
                        <p className="avatar_date">
                          {formatDate(item.created_at)}
                        </p>
                      </div>
                      <div className="sender_pro_icon">U</div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Chat input area */}
        <div className="chat_area">
          <textarea
            className="chat_box"
            rows={
              selectedFiles.length > 0
                ? Math.max(4, 10 - selectedFiles.length)
                : 10
            }
            placeholder={
              hasFiles
                ? "Files selected. Clear files to type a message."
                : "Send message..."
            }
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            disabled={hasFiles}
          />

          {/* Show selected files preview */}
          {selectedFiles.length > 0 && (
            <div className="selected_files_container">
              {selectedFiles.map((file, index) => (
                <div key={index} className="selected_file">
                  <div className="file_info">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M8.66667 1.33334H4C3.64638 1.33334 3.30724 1.47382 3.05719 1.72387C2.80714 1.97392 2.66667 2.31305 2.66667 2.66667V13.3333C2.66667 13.687 2.80714 14.0261 3.05719 14.2762C3.30724 14.5262 3.64638 14.6667 4 14.6667H12C12.3536 14.6667 12.6928 14.5262 12.9428 14.2762C13.1929 14.0261 13.3333 13.687 13.3333 13.3333V6.00001L8.66667 1.33334Z"
                        stroke="#051D14"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.66667 1.33334V6.00001H13.3333"
                        stroke="#051D14"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="file_name">
                      {file.name.length > 25
                        ? file.name.substring(0, 23) + "..."
                        : file.name}
                    </span>
                    <span className="file_size">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <button
                    className="remove_file"
                    onClick={() => removeFile(index)}
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M12 4L4 12"
                        stroke="#051D14"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 4L12 12"
                        stroke="#051D14"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="chat_area_action_con">
            <div className="chat_area_action_con_left">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clip-path="url(#clip0_40000010_8225)">
                    <path
                      d="M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z"
                      stroke="#051D14"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9 10H9.01"
                      stroke="#051D14"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15 10H15.01"
                      stroke="#051D14"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.5 15C9.82588 15.3326 10.2148 15.5968 10.6441 15.7772C11.0734 15.9576 11.5344 16.0505 12 16.0505C12.4656 16.0505 12.9266 15.9576 13.3559 15.7772C13.7852 15.5968 14.1741 15.3326 14.5 15"
                      stroke="#051D14"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_40000010_8225">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div>
                {/* Add file input for attachments */}
                <label
                  htmlFor="file-upload"
                  className={`file-upload-label ${
                    hasTextMessage ? "disabled-upload" : ""
                  }`}
                  style={{
                    opacity: hasTextMessage ? 0.5 : 1,
                    cursor: hasTextMessage ? "not-allowed" : "pointer",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_40000010_8231)">
                      <path
                        d="M14.9997 6.99996L8.4997 13.5C8.10188 13.8978 7.87838 14.4374 7.87838 15C7.87838 15.5626 8.10188 16.1021 8.4997 16.5C8.89753 16.8978 9.43709 17.1213 9.9997 17.1213C10.5623 17.1213 11.1019 16.8978 11.4997 16.5L17.9997 9.99996C18.7954 9.20432 19.2423 8.12518 19.2423 6.99996C19.2423 5.87475 18.7954 4.79561 17.9997 3.99996C17.2041 3.20432 16.1249 2.75732 14.9997 2.75732C13.8745 2.75732 12.7954 3.20432 11.9997 3.99996L5.4997 10.5C4.30623 11.6934 3.63574 13.3121 3.63574 15C3.63574 16.6878 4.30623 18.3065 5.4997 19.5C6.69318 20.6934 8.31188 21.3639 9.9997 21.3639C11.6875 21.3639 13.3062 20.6934 14.4997 19.5L20.9997 13"
                        stroke="#051D14"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_40000010_8231">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="application/pdf"
                  onChange={hasTextMessage ? null : handleFileSelect}
                  disabled={hasTextMessage}
                  style={{ display: "none" }}
                />
              </div>
            </div>

            <div className="chat_area_action_con_roght">
              <button
                className="chat_area_action_con_roght_btn"
                onClick={handleSendMessage}
                disabled={
                  (!messageText.trim() && selectedFiles.length === 0) ||
                  !orderData ||
                  sendingMessage
                }
              >
                {sendingMessage ? (
                  <div className="send_loading">
                    <div className="send_loading_spinner"></div>
                    <span>.....</span>
                  </div>
                ) : (
                  <>
                    Send
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      {/* Existing send icon */}
                      <g clip-path="url(#clip0_40000010_8239)">
                        <path
                          d="M8.33301 11.6667L17.4997 2.5"
                          stroke="black"
                          stroke-width="1.66667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M17.4998 2.5L12.0831 17.5C12.0466 17.5798 11.9879 17.6474 11.914 17.6948C11.8402 17.7422 11.7542 17.7674 11.6665 17.7674C11.5787 17.7674 11.4928 17.7422 11.4189 17.6948C11.3451 17.6474 11.2864 17.5798 11.2498 17.5L8.33315 11.6667L2.49981 8.75C2.42003 8.71344 2.35242 8.65474 2.30502 8.58088C2.25762 8.50701 2.23242 8.4211 2.23242 8.33333C2.23242 8.24557 2.25762 8.15965 2.30502 8.08579C2.35242 8.01193 2.42003 7.95323 2.49981 7.91667L17.4998 2.5Z"
                          stroke="black"
                          stroke-width="1.66667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_40000010_8239">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for viewing templates */}
      {isModalOpen && (
        <div className="main_model_con_cv">
          <div className="modal-overlay_close" onClick={closeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <g clip-path="url(#clip0_331_34992)">
                <path
                  d="M24 8L8 24"
                  stroke="black"
                  stroke-width="2.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8 8L24 24"
                  stroke="black"
                  stroke-width="2.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_331_34992">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="modal_chat_bot">
            <div className="modal_sub">
              <div className="modal-content">
                <button
                  className="chat_model_arrow left_arrow_chat norml_type_chat_btn"
                  onClick={() => navigateImage("prev")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <mask
                      id="mask0_331_34978"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="30"
                      height="30"
                    >
                      <path d="M0 30H30V0H0V30Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_331_34978)">
                      <path
                        d="M11.25 23.75L13.0125 21.9875L7.2875 16.25H27.5V13.75H7.2875L13.025 8.0125L11.25 6.25L2.5 15L11.25 23.75Z"
                        fill="white"
                      />
                    </g>
                  </svg>
                </button>

                {templatesLoading ? (
                  <div className="template-loading">Loading templates...</div>
                ) : !templateImages[currentImageIndex] ||
                  !templateImages[currentImageIndex].src ? (
                  <div className="template-error">
                    Template image not available
                  </div>
                ) : (
                  <img
                    src={templateImages[currentImageIndex].src}
                    alt={templateImages[currentImageIndex].name}
                    className="model_image_chat"
                  />
                )}

                <button
                  className="chat_model_arrow right_arrow_chat norml_type_chat_btn"
                  onClick={() => navigateImage("next")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <mask
                      id="mask0_331_34985"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="30"
                      height="30"
                    >
                      <path d="M30 30H0V0H30V30Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_331_34985)">
                      <path
                        d="M18.75 23.75L16.9875 21.9875L22.7125 16.25H2.5V13.75H22.7125L16.975 8.0125L18.75 6.25L27.5 15L18.75 23.75Z"
                        fill="white"
                      />
                    </g>
                  </svg>
                </button>
              </div>
            </div>
            <div className="res_type_chat_btn">
              <button
                className="chat_model_arrow_res left_arrow_chat_res"
                onClick={() => navigateImage("prev")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <mask
                    id="mask0_331_34978"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="30"
                    height="30"
                  >
                    <path d="M0 30H30V0H0V30Z" fill="white" />
                  </mask>
                  <g mask="url(#mask0_331_34978)">
                    <path
                      d="M11.25 23.75L13.0125 21.9875L7.2875 16.25H27.5V13.75H7.2875L13.025 8.0125L11.25 6.25L2.5 15L11.25 23.75Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </button>
              <button
                className="chat_model_arrow_res right_arrow_chat_res"
                onClick={() => navigateImage("next")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <mask
                    id="mask0_331_34985"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="30"
                    height="30"
                  >
                    <path d="M30 30H0V0H30V30Z" fill="white" />
                  </mask>
                  <g mask="url(#mask0_331_34985)">
                    <path
                      d="M18.75 23.75L16.9875 21.9875L22.7125 16.25H2.5V13.75H22.7125L16.975 8.0125L18.75 6.25L27.5 15L18.75 23.75Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </button>
            </div>
            <button
              onClick={() => (window.location.href = "/currentOrder")}
              className="back_chat_btn"
            >
              Back to chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderPlacedChat;
