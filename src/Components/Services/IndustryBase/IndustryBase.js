import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../NavBar/NavBar'
import HeroSection from './Components/HeroSection/HeroSection'
import Section2 from './Components/Section2/Section2'
import Reviews from './Components/ClientReviews/Reviews'
import Impression from './Components/Impression/Impression'
import InvestSection from './Components/InvestSection/InvestSection'
import Footer from '../../Footer/Footer'
import JobSearch from './Components/JobSearch/JobSearch'
const IndustryBase = () => {
    const { topic } = useParams(); // Get the topic from the URL parameter

    const content = {
        accounting: {
            //hero section
            subNav: "Accounting & Finance",
            title: "Accounting & Finance Resume Writing Services",
            heroPera: "Are you searching for the perfect opportunity for you in the finance and accounting industry? Did you know that a strong, professional resume can boost your job search? Your resume must emphasize how you can contribute to your employer’s success through quantified achievements",
            //Section 2
            Section2Topic: "Why is Resume Mansion the best place to visit for an Accounting and Finance Resume?",
            Section2pera1: "Resume Mansion is an industry leader in the creation of ATS-friendly, keyword-optimized resumes that has helped over 700,000 American job seekers find their dream profession. With our expertly crafted resumes, cover letters, and LinkedIn profiles, you are just a few clicks away from your dream career!",
            Section2pera2: "Our certified professional resume writers understand how personal branding plays a major role in accounting and finance resumes. Over the years, our resume writers have created resumes that reflect the career values and exceptional talents of our clients. Resume Mansion has helped countless accounting professionals from the entry-level to the C-suite realize their career dreams, as you can see from the reviews below.",
            //Client Review
            ReviewTopic: "Listen to what our clients have to say about our Accounting and Finance Resumes",
            Reviews: [
                { owner: "Sarah M., Senior Financial Analyst", text: "At first, I wasn’t too sure about using a resume writer, but Resume Mansion ended up exceeding all my expectations! I have over ten years of experience in the finance sector and needed a resume that highlighted my experience without boring potential employers. My resume writer delicately balanced my accomplishments and highlighted my experience with financial forecasting and modeling in an impressive manner. I’ve already landed several interviews for management positions with my Resume Mansion resume. " },
                { owner: "Alex T., Recent Accounting Graduate", text: "I struggled for a while fresh out of college to write a resume that just clicks with employers. I wanted to stand out in a sea of other fresh grads. That’s when Resume Mansion came to the rescue! They helped me highlight my limited accounting experience and portrayed me as a strong candidate. I got a final resume that was professional, concise, and perfectly tailored to my dream accounting job! Now, I’m a junior accountant with my favorite employer! Thank you, Resume Mansion!" },
            ],
            //Impression
            ImpressionTitle: "What will you receive?",
            ImpressionPera: "We have three attractive resume-writing packages tailored to the needs of accounting and finance professionals. All three of our packages include expertly crafted visually appealing resumes that are ATS-friendly. We also offer cover letter writing and LinkedIn profile optimization services for the high-achieving accounting and finance professionals that come our way. Whether you want to showcase your impressive numbers or your cash flow modeling skills, we have got you covered!",
            //InvestSection
            InvestSectionTopic: "Why should you Invest in an Accounting and Finance Resume?",
            InvestSectionBox1Topic: "More numbers, less guesswork",
            InvestSectionBox1Pera: "A professionally written resume that highlights your biggest wins using quantified results and helps you stand out in the job market? Yes, please!",
            InvestSectionBox2Topic: "Turn your debits into career credits",
            InvestSectionBox2Pera: "Don’t settle for a basic resume when you can have a killer resume that portrays you as the financial genius you are. Our resumes are guaranteed to be assets, not liabilities.",
            InvestSectionBox3Topic: "Balance your career sheet",
            InvestSectionBox3Pera: "A top-tier accounting resume from Resume Mansion will balance your skills, experiences, and expertise and turn you into a winner in the job market. Let your new resume scream, “Hire me!”",
            //JobSearch
            JobSearchTopic: "How does Resume Mansion help you achieve your job search goals?",
            JobSearchsubTopic1: "Our resume writers have extensive knowledge of the accounting and finance sector",
            JobSearchsubPera1: "When you hire our services, we review your career goals and your expertise to pair you with the resume writer who is the most equipped to transform your generic resume into a winning masterpiece. As your resume writer has all the knowledge about the evolving standards of the accounting and finance sector, your resume is sure to align with industry standards.",
            JobSearchsubTopic2: "We tailor your resume to suit the accounting and finance job market",
            JobSearchsubPera2: "Once you get talking to us, we will request you to send in a few accounting and finance job descriptions that you are interested in. After your resume writer has familiarized themself with your career goals, they will craft a resume that is tailored to the exact employers and positions that you are targeting. This ensures that your resume gets through the initial screening tests.",
            JobSearchsubTopic3: "We emphasize the right accounting and finance skills on your resume",
            JobSearchsubPera3: "We understand the difference between the skills required for a CPA resume and a CFO resume. Depending on your career goals, our resume writers will transform your resume into a compelling narrative of your career. We will tailor the skills section and the work experience section of your resume with the very best skills from the employer’s job description.",
        },
        administrative: {
            //hero section
            subNav: "Administrative",
            title: "Administrative Resume Writing Service",
            heroPera: "Do you want to land your next opportunity in the administrative field faster than you can say, “Hire me”? Then, you need a professional administrative resume that shows potential employers how well you keep your workplace running smoothly without hiccups. An administrative resume must highlight your best qualities including your organizational, communication, and multitasking skills.",
            //Section 2
            Section2Topic: "Why should you visit Resume Mansion for an Administrative resume?",
            Section2pera1: "As an industry leader in the US resume writing scene, we have amassed a clientele of over 700,000 successful professionals over the years. Whether you want to try out for an admin assistant job or a higher position as an office manager, we have all your needs covered here at Resume Mansion.",
            Section2pera2: "Our team of certified professional resume writers has years of experience crafting successful administrative resumes for entry-level to executive assistants. Each of our resumes is built to reflect your career values and unique talents as a job seeker, so you are sure to get the attention that you deserve with a Resume Mansion resume.",
            //Client Review
            ReviewTopic: "Listen to what our clients have to say about Resume Mansion’s Administrative Resumes",
            Reviews: [
                { owner: "Emily T, Executive Assistant", text: "I transitioned from a receptionist position to an executive assistant role in less than a month thanks to Resume Mansion! My new administrative resume highlights my organizational skills flawlessly and also emphasizes how well I manage complex schedules and tasks. I’m glad I found Resume Mansion!" },
                { owner: "Robert G., Office Manager", text: "I’ve had about 15 years of experience in the administrative field. I wanted a new resume that talks about my experience managing admin teams and offices. Resume Mansion exceeded my expectations. As a result, I have currently secured interviews for office management roles" },
            ],
            //Impression
            ImpressionTitle: "What will you receive?",
            ImpressionPera: "Resume Mansion’s administrative resume packages are designed to serve professionals from all levels within the administrative industry. Our resumes come in visually appealing, ATS-friendly formats with additional services such as cover letter writing, and LinkedIn profile optimization incorporated into the package. Whether you are new to the field or are climbing up the admin career ladder, Resume Mansion is the one-stop solution to all your job search needs.",
            //InvestSection
            InvestSectionTopic: "Why should you invest in an Administrative Resume?",
            InvestSectionBox1Topic: "Emphasize your organizational superpowers",
            InvestSectionBox1Pera: "Want your resume to show off how you have organizational prowess, communication skills, and multitasking skills? Grab a Resume Mansion resume!",
            InvestSectionBox2Topic: "Boost your professional image",
            InvestSectionBox2Pera: "We write administrative resumes that show employers how you are an integral part of any organization, who keeps the whole operation running like clockwork.",
            InvestSectionBox3Topic: "Tailored for your success",
            InvestSectionBox3Pera: "You will never find two of our administrative resumes that are alike, and that’s a guarantee. Let our resumes help you stand out in the admin job market.",
            //JobSearch
            JobSearchTopic: "How does Resume Mansion help you achieve your Administrative Job Search Goals?",
            JobSearchsubTopic1: "Expertise in administrative roles",
            JobSearchsubPera1: "We have a team of excellent resume writers who are well-versed in the administrative sector. Our certified professional resume writers will ensure that your customer service, scheduling, and office management skills will never go unnoticed by employers.",
            JobSearchsubTopic2: "Customized for your job",
            JobSearchsubPera2: "When you work with Resume Mansion, you will receive a new resume that is targeted to whatever new administrative job that you are targeting. Our resumes are created to align with your target job descriptions and ensure maximum ATS compatibility for you to get through the initial screening.",
            JobSearchsubTopic3: "Emphasizing the right skills",
            JobSearchsubPera3: "Every administrative resume is built differently. Whether you want your resume to showcase the way you handle correspondence or how you take care of large-scale office projects, Resume Mansion’s administrative resumes will do it for you.",
        },
        business: {
            //hero section
            subNav: "Business & Management",
            title: "Business & Management Resume Writing Services",
            heroPera: "Planning for the next big break in your business or management career? Want to seize the best opportunities as soon as the job market opens up? Then, you need a well-crafted business and management resume in your job search portfolio! And what better place to get it done other than Resume Mansion?",
            //Section 2
            Section2Topic: "Why is Resume Mansion the best place for Business & Management Resumes?",
            Section2pera1: "Over the years, at Resume Mansion, we have helped hundreds of thousands of job seekers from all over the globe. Our expertly crafted business & management resumes, cover letters, and LinkedIn profiles have ensured that our clients receive the best possible offers from employers.",
            Section2pera2: "No matter whether you are aiming for a C-suite position or a middle management role, Resume Mansion’s certified resume writers have the right experience to craft your career narrative in a way that potential employers just can’t ignore!",
            //Client Review
            ReviewTopic: "Read what our clients have to say about Resume Mansion’s Business & Management Resumes",
            Reviews: [
                { owner: "John L., Business Consultant", text: "I wanted a resume that highlights my achievements as a business consultant for the past 15 years. Resume Mansion did wonderful work on my new resume, reflecting my contributions to revenue growth and process optimization. I would recommend Resume Mansion to any aspiring business and management professional. " },
                { owner: "Samantha K., Senor Manager", text: "After I decided to apply for senior management roles, a colleague told me about Resume Mansion. I hired a certified professional resume writer from my industry and started collaborating with them on my new resume. Within just 24 hours, I had a brand new resume that later got me the best offer I have ever received! " },
            ],
            //Impression
            ImpressionTitle: "What do you receive when you purchase one of our packages?",
            ImpressionPera: "Our business and management resume writing services come in three diverse packages, tailored to fit the job search needs of every candidate. With each of our packages, we offer an ATS-friendly, visually appealing, keyword-optimized resume. In addition, you can purchase a matching cover letter and LinkedIn profile to go with your new business and management resume.",
            //InvestSection
            InvestSectionTopic: "Why should you invest in a Business and Management Resume?",
            InvestSectionBox1Topic: "Stand out as a leader",
            InvestSectionBox1Pera: "Do you want to stand out among a sea of talented job seekers? Try a Resume Mansion resume that highlights your leadership skills, strategic thinking, and problem-solving capabilities.",
            InvestSectionBox2Topic: "Showcase your achievements",
            InvestSectionBox2Pera: "Our professional resume writers work very hard to ensure that the best professional achievements of your career are displayed prominently on your resume.",
            InvestSectionBox3Topic: "Tailored for high-impact roles",
            InvestSectionBox3Pera: "Our resumes are crafted to help you stand out from the crowd, whether you are a business analyst, project manager, or executive.",
            //JobSearch
            JobSearchTopic: "How does Resume Mansion help you in your job search?",
            JobSearchsubTopic1: "We have a deep knowledge of the business and management sector",
            JobSearchsubPera1: "Our resume writing team includes experienced senior resume writers with several years of experience crafting business and management resumes. Their expertise helps us ensure that your resume aligns with the industry standards and shows off your accomplishments in the best ways possible.",
            JobSearchsubTopic2: "We created targeted resumes",
            JobSearchsubPera2: "All Resume Mansion resumes are customized to the client’s preferred target job title. Our professional resume writers always take the time to tailor your set of documents to align with your career goals.",
            JobSearchsubTopic3: "We highlight the right business and management skills",
            JobSearchsubPera3: "Your business and management resume must mention the in-demand skills if you want to stand out in the job market as an aspiring leader. Our professional resume writers can help you achieve that goal.",
        },
        education: {
            //hero section
            subNav: "Education",
            title: "Education Resume Writing Service",
            heroPera: "Do you want to make a difference in the education sector? A professionally crafted resume can help you demonstrate your teaching experience, capability to create and foster a positive learning environment, and subject matter expertise. Resume Mansion is the perfect place for teachers, administrators, and education specialists to find their dream education resume.",
            //Section 2
            Section2Topic: "Why is Resume Mansion the best place for your Education Resume?",
            Section2pera1: "Resume Mansion has a strong track record of developing winning education resumes for professionals from all walks of life for many years. Our certified resume writers have proven time and time again that they are highly skilled in crafting professional education resumes that just click with employers.",
            Section2pera2: "Whether you are applying for a classroom teaching position, a principal role, or an educational consultancy role, we have the right resume writer for you. Our professional resume writers are trained to develop strong education resumes that emphasize teaching skills, curriculum development experience, and student guidance skills of education professionals.",
            //Client Review
            ReviewTopic: "What do our clients have to say about our Education Resume Writing Services?",
            Reviews: [
                { owner: "Emily J., Elementary school teacher", text: "For years, I have struggled to move up from a teaching assistant position into a full-time role as a classroom teacher. Then, I came across this website. With Resume Mansion; ‘s help, I was able to achieve my goal in less than six weeks!" },
                { owner: "Jonathan P., High school principal", text: "I started my job search with the goal of transitioning from my role as an educator into a leadership role. I hired a certified resume writer from Resume Mansion to work on my resume, cover letter, and LinkedIn profile. With their help, I am now the principal of my local high school." },
            ],
            //Impression
            ImpressionTitle: "What will you receive?",
            ImpressionPera: "Our Education resume writing packages are tailored to cater to the needs of diverse education professionals from the entry-level to the leadership roles. We offer education resume writing, cover letter writing, and LinkedIn profile optimization services that will transform your job application in to a winning one.",
            //InvestSection
            InvestSectionTopic: "Why invest in Resume Mansion for your Education Resume?",
            InvestSectionBox1Topic: "Highlight your teaching experience",
            InvestSectionBox1Pera: "We create professionally tailored resumes that can emphasize your classroom experience, subject matter knowledge, and dedication to foster a positive learning experience for students.",
            InvestSectionBox2Topic: "Stand out as an educator",
            InvestSectionBox2Pera: "Resume Mansion’s education resumes are designed to ensure that your unique value proposition as an outstanding educator shines brightly.",
            InvestSectionBox3Topic: "Tailored to the education job market",
            InvestSectionBox3Pera: "Our certified professional resume writers are always updated on the current market trends and will craft the perfect resume for your administrative, educational consultancy, or teaching resume.",
            //JobSearch
            JobSearchTopic: "How does Resume Mansion help you achieve your Education Job Search Goals?",
            JobSearchsubTopic1: "Expertise in the education sector",
            JobSearchsubPera1: "Our resume writers have had years of experience crafting winning resumes for the education sector and have the know-how of bringing out the best of your skills on paper.",
            JobSearchsubTopic2: "Customized for your career goals",
            JobSearchsubPera2: "We tailor your resume to reflect the most relevant qualifications for your education career goal, be it a target job or an internal promotion.",
            JobSearchsubTopic3: "Emphasize the right skills for the industry",
            JobSearchsubPera3: "From student assessment to classroom management, our professional resume writers will ensure that your resume reflects the qualifications that employers are always looking out for.",
        },
        engineering: {
            //hero section
            subNav: "Engineering",
            title: "Engineering Resume Writing Services",
            heroPera: "Hoping to make it out in the engineering industry? Searching for your next big opportunity as an engineer? Then, you need a Resume Mansion resume in your corner cheering you forward! Whether you are applying for a job as a civil, mechanical, or biomedical engineer, having a professional resume that highlights your projects, achievements, and engineering skills is crucial for your job search.",
            //Section 2
            Section2Topic: "Why is Resume Mansion the best place for you to build your Engineering Resume?",
            Section2pera1: "We have had nearly a decade of experience helping engineering professionals like you achieve their impressive career goals. Over the years, Resume Mansion has helped more than 700,000 professionals find career success. Our engineering clients come from all levels of the career ladder, from fresh grads to engineering managers.",
            Section2pera2: "Resume Mansion’s certified professional resume writers understand the importance of incorporating the right industry-specific knowledge and technical skills in an engineering resume. Whether you are a product engineer or a project manager, we will have your needs covered here at Resume Mansion.",
            //Client Review
            ReviewTopic: "What do our clients have to say about our Engineering Resume Writing Services?",
            Reviews: [
                { owner: "Alex B., Mechanical Engineer", text: "I was fresh out of engineering school as a mechanical engineer and had a lot of trouble finding a position to fit my skills. With Resume Mansion’s expert guidance and impeccable resume revamp, I was able to apply for my dream job and secure it within just seven weeks!" },
                { owner: "Sarah K., Engineering Manager", text: "As a civil engineer for over fifteen years, I was struggling to place myself in a higher management role within my industry. A friend directed me to the Resume Mansion website where I spoke with a senior resume writer about my new resume. Fast forward two months, and I am now happily employed in my dream job. " },
            ],
            //Impression
            ImpressionTitle: "What will you be receiving?",
            ImpressionPera: "Resume Mansion’s engineering resume writing packages are tailored to fit the high demands of the industry. With ATS-friendly, tailored, keyword-optimized resumes, cover letters, and LinkedIn profiles, you are sure to have success in your engineering job search.",
            //InvestSection
            InvestSectionTopic: "Why should you invest in an Engineering Resume?",
            InvestSectionBox1Topic: "Why should you invest in an Engineering Resume?",
            InvestSectionBox1Pera: "Got loads of technical skills? Then, you are in the right place! Resume Mansion’s engineering resume writing services are tailored to fit the demands of the modern job market.",
            InvestSectionBox2Topic: "Highlight your project experience",
            InvestSectionBox2Pera: "We believe that your resume should reflect your biggest contributions to employers during engineering projects, from design and development to project management.",
            InvestSectionBox3Topic: "Tailored for engineering roles",
            InvestSectionBox3Pera: "At Resume Mansion, we tailor your resume, cover letter, and LinkedIn profile to your target engineering job role to ensure that your new resume aligns with industry standards.",
            //JobSearch
            JobSearchTopic: "How does Resume Mansion help you reach your Job Search Goals?",
            JobSearchsubTopic1: "Deep understanding of the engineering industry",
            JobSearchsubPera1: "With over ten years of experience in the resume writing industry, our certified professional resume writers are equipped with industrial awareness and resume writing best practices.",
            JobSearchsubTopic2: "Tailored to fit engineering roles",
            JobSearchsubPera2: "Each engineering resume built by Resume Mansion is specifically tailored to suit the needs of your target employer.",
            JobSearchsubTopic3: "Highlight the right engineering skills",
            JobSearchsubPera3: "Resume Mansion resumes are built to emphasize your technical expertise and leadership in engineering projects. We include the very best skills in your resume to help you stand out as an engineer.",
        },
        human: {
            //hero section
            subNav: "Human Resource",
            title: "Human Resource Resume Writing Service",
            heroPera: "Are you ready to stir up a storm in the human resources industry? Want to put your recruitment, employee relations, and HR management skills to the test with your favorite employer? Then, you have come to the right place for your brand new human resources resume!",
            //Section 2
            Section2Topic: "Why is Resume Mansion the best place for your HR resume?",
            Section2pera1: "At Resume Mansion, we have helped hundreds of thousands of job seekers achieve success in their careers through carefully crafted resumes, cover letters, and LinkedIn profiles. Our resume writers have extensive knowledge of the human resources industry and are adept at creating winning resumes that answer the needs of potential employers.",
            Section2pera2: "Resume Mansion does not discriminate when it comes to HR resumes. We cater to everyone from HR assistants to HR managers and directors. Our services provide customized documentation that is sure to get you highlighted among a mass of other job seekers.",
            //Client Review
            ReviewTopic: "Listen to what our clients have to say about our Human Resource Resumes",
            Reviews: [
                { owner: "Laura T., HR Coordinator", text: "I was working as an HR coordinator for a while and was ready to scale up in terms of responsibility and company size. Resume Mansion helped me narrate my career story in a way that appealed to large-scale employers in my industry. I have already secured three job interviews with my new resume." },
                { owner: "Michael S., HR Manager", text: "I have a strong track record of working in HR for over fifteen years. I wanted a resume that could reflect my experience with employee relations and recruitment. I spoke with a resume writer from Resume Mansion who helped me spot the mistakes that I was making with my resume. With their help, I got a brand new resume that got me my current job in a very short time!" },
            ],
            //Impression
            ImpressionTitle: "What will you receive when you work with Resume Mansion?",
            ImpressionPera: "Resume Mansion’s human resource resume writing services are tailored to answer all your job search needs. Our packages include attractive, ATS-friendly, keyword-optimized resumes, cover letters, and LinkedIn profiles that align with the latest industry standards. With our services, you can confidently move forward in your job search with a winning job application package.",
            //InvestSection
            InvestSectionTopic: "Why should you invest in a Resume Mansion Resume?",
            InvestSectionBox1Topic: "Highlight your HR expertise",
            InvestSectionBox1Pera: "Let our professionally crafted resumes, cover letters, and LinkedIn profiles reflect your best HR skills such as talent acquisition, employee relations, and HR management, helping you secure your dream HR job.",
            InvestSectionBox2Topic: "Emphasize your leadership skills",
            InvestSectionBox2Pera: "Resume Mansion can help you showcase your HR leadership skills in a way that makes you an asset to potential employers.",
            InvestSectionBox3Topic: "Tailored to HR positions",
            InvestSectionBox3Pera: "Our resumes, cover letters, and LinkedIn profiles are tailored to fit the needs of every HR professional and align with the industry standards.",
            //JobSearch
            JobSearchTopic: "How does Resume Mansion help with your Human Resources Job Search?",
            JobSearchsubTopic1: "Expertise in the HR field",
            JobSearchsubPera1: "Most of our professional resume writers have worked in the HR and recruitment industry and have in-depth knowledge about the demands of employers.",
            JobSearchsubTopic2: "Customized to fit career goals",
            JobSearchsubPera2: "Every resume, cover letter, and LinkedIn profile that we craft is tailored to fit a specific job description that you are targeting, ensuring that you have the best chances of getting noticed by employers in the job market",
            JobSearchsubTopic3: "Emphasize the right HR skills",
            JobSearchsubPera3: "We make sure that your resume reflects all the qualifications that potential employers are looking out for, from compliance and workforce management to employee development.",
        },
        legal: {
            //hero section
            subNav: "Legal",
            title: "Legal Resume Writing Services",
            heroPera: "Want a case-winning resume to boost your legal job search forward? Whether you are a legal consultant or an attorney, Resume Mansion has the perfect resources to help you improve your chances of standing out in a courtroom full of candidates!",
            //Section 2
            Section2Topic: "Why is Resume Mansion the best place for your Legal Resume?",
            Section2pera1: "We have helped more than 700,000 job seekers from all over the globe land their dream opportunities with carefully crafted resumes, cover letters, and LinkedIn profiles. Our resume writing team comprises senior resume writers with over five years of experience crafting resumes for the legal sector.",
            Section2pera2: "With resumes, cover letters, and LinkedIn profiles that cover your legal research skills, case management abilities, and litigation success stories, you are sure to shine bright among your competition in the job market. Win on merit with a Resume Mansion resume that does justice to your impressive legal career!",
            //Client Review
            ReviewTopic: "What do our clients say about our Legal Resume Writing Services?",
            Reviews: [
                { owner: "Julia S., Junior Associate", text: "I was jumping from one legal clerk job to another until I discovered Resume Mansion. It was a game changer for my job search. With their help, I managed to score multiple interviews for better job opportunities. Today, I have happily advanced in my career thanks to Resume Mansion." },
                { owner: "Marcus W., Corporate Lawyer", text: "My old resume did not describe my career progression in a way that appealed to legal employers. However, Resume Mansion did a total resume revamp for me. I have confidence that this new resume will be the turning point of my career. " },
            ],
            //Impression
            ImpressionTitle: "What will you receive?",
            ImpressionPera: "Our legal resumes, cover letters, and LinkedIn profiles are built to enhance your courtroom victories, legal research skills, and professional credentials in a way that compels hiring managers. Present yourself as the best advocate for your dream opportunity with a whole new set of job search documents from Resume Mansion!",
            //InvestSection
            InvestSectionTopic: "Why invest in a Legal Resume?",
            InvestSectionBox1Topic: "Highlight your legal expertise",
            InvestSectionBox1Pera: "Your legal expertise makes you an asset for any employer. Let us highlight your knowledge of contract law or criminal justice to present you as the best candidate for the position.",
            InvestSectionBox2Topic: "Present your professional credentials",
            InvestSectionBox2Pera: "Resume Mansion’s legal resumes are built to emphasize your education, bar membership, and other notable legal achievements to appeal to the legal job market.",
            InvestSectionBox3Topic: "Tailored for the legal industry",
            InvestSectionBox3Pera: "Provide us with your target employer/job description, and we will create a matching set of legal job search documents for you that take you exactly where you want in your job search.",
            //JobSearch
            JobSearchTopic: "How does Resume Mansion help you in your Legal Job Search?",
            JobSearchsubTopic1: "Knowledge of the legal industry ",
            JobSearchsubPera1: "Resume Mansion’s expert resume writers will balance your legal experience with the demands of the job market, presenting you in a whole new light.",
            JobSearchsubTopic2: "Custom-tailored to your specialization",
            JobSearchsubPera2: "Our resumes are crafted to fit the needs of whatever area of law that you focus on, be it family law, corporate law, or criminal law.",
            JobSearchsubTopic3: "Step around the jargon",
            JobSearchsubPera3: "We make legalese sound fun! Our resume writers ensure that your resume appeals even to a hiring manager who does not understand all the legal lingo.",
        },
        information: {
            //hero section
            subNav: "Information Technology",
            title: "Information Technology Resume Writing Services",
            heroPera: "Ready to code your way into your next big opportunity as a tech guru? Resume Mansion can help you achieve your IT job dreams, whether you are aiming for a position in cybersecurity, software development, or IT management. Let us debug your resume and revolutionize your job search!",
            //Section 2
            Section2Topic: "Why is Resume Mansion the perfect place for your IT resume?",
            Section2pera1: "Resume Mansion has helped over 700,000 job seekers from diverse industries and the IT sector is no exception. We shine bright in the tech world, with hundreds of It resumes created every year. Our certified resume writers know the IT sector inside out and will help you out with the best set of job search documents you have ever had!",
            Section2pera2: "Our expert resume writers can take all the geek in your resume and translate them in a way that any hiring manager can easily understand the depth of your achievements. ATS-friendly? Keyword-optimized? You bet! Resume Mansion resumes are built to pass every technical screening with flying colors.",
            //Client Review
            ReviewTopic: "What do our clients have to say about our IT resumes?",
            Reviews: [
                { owner: "Derek L., Full Stack Developer", text: "With my old resume, I kept running in circles in my job search. I felt that my achievements were stuck in 2010 with an outdated format and complex verbiage. With Resume Mansion’s help, my resume became user-friendly overnight!" },
                { owner: "Megan C., Systems Analyst", text: "I have been getting zero responses from employers for months. I spoke with an expert from Resume Mansion who explained to me that my former resume was not ATS-friendly. Once my resume was rewritten professionally to fit the industry's demands, I was able to secure multiple job interviews. " },
            ],
            //Impression
            ImpressionTitle: "What will you receive?",
            ImpressionPera: "Our IT resume writing packages are tailored to showcase your programming skills, technical certifications, and project experience in the best possible ways. Turn your resume into a digital masterpiece with our help and let your portfolio shine! We also offer specialized cover letter writing and LinkedIn profile optimization services to the IT sector.",
            //InvestSection
            InvestSectionTopic: "Why invest in an IT Resume from Resume Mansion?",
            InvestSectionBox1Topic: "Showcase your tech stack",
            InvestSectionBox1Pera: "Make recruiters go “Wow,” with a resume that highlights your mastery of coding languages, network security, and database management!",
            InvestSectionBox2Topic: "Tailored for IT roles",
            InvestSectionBox2Pera: "We will make sure that your resume is specially crafted for whatever role you are targeting in the IT sector, be it DevOps, cybersecurity, or data science.",
            InvestSectionBox3Topic: "",
            InvestSectionBox3Pera: "",
            //JobSearch
            JobSearchTopic: "How does Resume Mansion help with your IT job search goals?",
            JobSearchsubTopic1: "In-depth knowledge of IT roles",
            JobSearchsubPera1: "Our certified professional resume writers have an in-depth knowledge of the IT sector and will help turn your resume into a winning document.",
            JobSearchsubTopic2: "Keep your resume up to date",
            JobSearchsubPera2: "We understand that the tech industry evolves fast. That’s why we constantly update our resume writing best practices to suit the demands of the industry.",
            JobSearchsubTopic3: "Data-driven results",
            JobSearchsubPera3: "We have a track record of success in helping IT professionals stand out in the tech job market. Our resumes always get the results our clients want.",
        },
        marketing: {
            //hero section
            subNav: "Marketing",
            title: "Marketing Resume Writing Services",
            heroPera: "It’s time to market yourself like the pro you are in the industry! Whether you are applying for a digital marketing strategist position or a content creator position, Resume Mansion has got your job search needs covered!",
            //Section 2
            Section2Topic: "Why must you come to Resume Mansion for your Marketing Resume?",
            Section2pera1: "Resume Mansion has a strong track record of helping marketing professionals achieve their desired job search goals for over five years. Our certified professional resume writers understand what it takes for a job seeker to stand out in the fast-paced, results-driven marketing world.",
            Section2pera2: "Your expertise in social media strategies, email marketing, or PPC campaigns no longer has to take a backseat in your job search. Resume Mansion will ensure that your new resume is written in a way that presents you as the ideal candidate for your target position.",
            //Client Review
            ReviewTopic: "What do our clients have to say about our Marketing Resume Writing Services?",
            Reviews: [
                { owner: "Jessica A., Social Media Strategist", text: "As a social media manager for more than five years, I needed a resume that could reflect my personal brand and skills. Resume Mansion perfectly understood my needs and created a new resume for me that is as captivating as a viral TikTok video" },
                { owner: "Mark C., Brand Strategist", text: "I didn't realize how much I was understating myself until I came to Resume Mansion. They revamped my resume and ensured that I looked good enough on paper to appeal to even the toughest hiring managers" },
            ],
            //Impression
            ImpressionTitle: "What will you receive when you work with Resume Mansion?",
            ImpressionPera: "Our marketing resume writing packages are tailored to suit the demands of this industry. We understand what it takes to present you as an ideal candidate for this fast-paced results-driven sector. Our cover letter writing, and LinkedIn profile optimization services go hand in hand to ensure that you have the best professional presence for your job search.",
            //InvestSection
            InvestSectionTopic: "Why should you invest in a Resume Mansion Marketing Resume?",
            InvestSectionBox1Topic: "Highlight your results",
            InvestSectionBox1Pera: "We understand that numbers speak louder than words. That's why Resume Mansion’s marketing resumes highlight important statistics from ROI to audience growth.",
            InvestSectionBox2Topic: "Present your creative flair",
            InvestSectionBox2Pera: "Our resumes are designed to balance creativity with strategy, whether you are applying for a content writing job or needing to present yourself as a strategic mastermind. ",
            InvestSectionBox3Topic: "Tailored for marketing roles",
            InvestSectionBox3Pera: "There is no role that our certified professional resume writers shy away from. Whether you are a brand manager or a CMO, our resumes will reflect your best skills",
            //JobSearch
            JobSearchTopic: "How does Resume Mansion help you achieve your marketing job search goals?",
            JobSearchsubTopic1: "Mastery of marketing language",
            JobSearchsubPera1: "Resume Mansion’s certified professional resume writers know how to capture the creativity and the data-driven aspect of a marketing resume to make sure that hiring managers love it.",
            JobSearchsubTopic2: "Tailored to your expertise",
            JobSearchsubPera2: "We will ensure that your resume highlights the skills that matter the most for your roles, whether you are specializing in inbound marketing performance marketing or brand management.",
            JobSearchsubTopic3: "Make your resume a marketing tool",
            JobSearchsubPera3: "Your resume is your first pitch to a potential employer. We make sure that it is persuasive, compelling, and full of visual appeal.",
        },
        medical: {
            //hero section
            subNav: "Medical",
            title: "Medical Resume Writing Services",
            heroPera: "Are you ready to put your current resume under the knife? Whether you are a nurse, physician, or healthcare administrator, Resume Mansion is the perfect place for your next medical resume. Let us diagnose what is wrong with your current resume and give it the right treatment to take it to the next level.",
            //Section 2
            Section2Topic: "Why is Resume Mansion the perfect place for a Medical Resume?",
            Section2pera1: "We have over 700,000 success stories in our arsenal. This is why Resume Mansion is one of the best places in the industry to give your medical career a healthy boost. Our team of certified professional resume writers has an in-depth understanding of the unique demands of the healthcare sector.",
            Section2pera2: "Resume Mansion can help you boost your job search forward, whether you are on the front lines as a nurse or in a more behind-the-scenes capacity as a healthcare administrator. Let your Resume Mansion resume reflect your dedication, precision, and compassion to a hiring manager.",
            //Client Review
            ReviewTopic: "What do our clients have to say about our Medical Resumes? ",
            Reviews: [
                { owner: "Claire S., Registered Nurse ", text: "I'm a registered nurse with over 10 years of experience but my previous resume wasn't cutting it in the job market. Resume Mansion helped me to turn it into a document that got me more than three interviews within two months" },
                { owner: "Michael L., Healthcare Administrator", text: "As a healthcare administrator, I was looking for a resume that could reflect my leadership skills and my ability to handle and manage teams. Resume Mansion helped me achieve my job search goals with a resume that truly reflected my capabilities as a healthcare administrator. " },
            ],
            //Impression
            ImpressionTitle: "What will you receive when you work with Resume Mansion? ",
            ImpressionPera: "Resume Mansion’s medical resume writing packages are tailored to highlight your clinical skills, certifications, and leadership experience in the healthcare sector. We also offer customized cover letter writing and LinkedIn profile optimization services for any healthcare professional who wants to take their job application to the next level.",
            //InvestSection
            InvestSectionTopic: "Why should you invest in a medical resume?",
            InvestSectionBox1Topic: "Highlight your clinical expertise",
            InvestSectionBox1Pera: "Our certified professional resume writers understand that the healthcare sector has unique demands and will ensure that your resume highlights everything from patient care to surgical procedures. ",
            InvestSectionBox2Topic: "Tailored for health care roles ",
            InvestSectionBox2Pera: "No matter what your job title within the industry, we have the expertise to craft a resume that meets the specific demands of the employer related to your role and the industry.",
            InvestSectionBox3Topic: "Showcase your certification ",
            InvestSectionBox3Pera: "We understand that certifications are crucial when it comes to the healthcare sector. That is why Resume Mansion’s healthcare resumes are built to emphasize your credentials and advanced certifications in your specialty.",
            //JobSearch
            JobSearchTopic: "How does Resume Mansion help you propel your Job Search Forward?",
            JobSearchsubTopic1: "We understand the healthcare industry ",
            JobSearchsubPera1: "Our writers know the ins and outs of the medical sector. So, your resume will be reflecting both your clinical expertise and your affinity for compassionate care.",
            JobSearchsubTopic2: "Tailored to your specialty ",
            JobSearchsubPera2: "Whether you are working in pediatrics or geriatrics, our resumes will emphasize your areas of expertise and highlight all the right skills for your target job title.",
            JobSearchsubTopic3: "A dose of confidence for your job search ",
            JobSearchsubPera3: "With a professionally crafted resume, you can now walk into any healthcare job interview confidently and with your head held high.",
        },
        maintenance: {
            //hero section
            subNav: "Maintenance and Repair",
            title: "Maintenance and Repair Resume Writing Services",
            heroPera: "Does your resume feel like it needs a little bit of maintenance? If you are a professional in the maintenance and repair industry and are looking for a job right now, you need a resume that works as hard as you do. Whether you are a handyman, HVAC technician, or an industrial mechanic, we know just how to fine-tune your resume so that you stand out in this competitive job market.",
            //Section 2
            Section2Topic: "Why is Resume Mansion the best place for you to visit for a Maintenance and Repair Resume?",
            Section2pera1: "As we always mention, we have helped over 700,000 professionals all over the globe land their dream jobs with tailored and customized resumes. The maintenance and repair industry is not an alien place for our resume writers. We have a history of helping maintenance and repair professionals highlight their technical skills, certifications, and experiences so that they stand out in the job market.",
            Section2pera2: "Your resume must be optimized for both the bots and the hiring managers. No matter whether you are an auto mechanic or a general maintenance worker, we will ensure that your new resume highlights the tools that you're familiar with while emphasizing your problem-solving abilities.",
            //Client Review
            ReviewTopic: "What do other clients say about our Maintenance and Repair Resumes?",
            Reviews: [
                { owner: "John F., HVAC Technician", text: "My old resume had trouble getting me seen by employers because it didn't represent my HVAC experience properly. Resume Mansion helped me transform my resume into a document that highlighted my certifications, technical skills, problem-solving skills, and other qualifications. Within two weeks I got hired. " },
                { owner: "Mike D., General Maintenance Worker", text: "I struggled to make my general maintenance resume stand out for many years. I was always getting rejected from job applications without even feedback from employers. With Resume Mansion’s help, I was able to catch the attention of hiring managers and land a great opportunity." },
            ],
            //Impression
            ImpressionTitle: "What will you receive?",
            ImpressionPera: "Resume Mansion’s maintenance and repair resume packages are tailored to include customized resumes that highlight all the right skills for the job that you're targeting. Your hands-on skills and certifications such as EPA and OSHA no longer need to be understated on your resume. We also offer you cover letter writing and LinkedIn profile optimization services to ensure that you can forward a complete job application.",
            //InvestSection
            InvestSectionTopic: "Why should you invest in a Maintenance and Repair Resume?",
            InvestSectionBox1Topic: "Showcase your technical expertise",
            InvestSectionBox1Pera: "From HVAC systems to plumbing, we highlight the skills that make you a unique professional in the field of maintenance and repair.",
            InvestSectionBox2Topic: "Tailored to your specific field",
            InvestSectionBox2Pera: "The maintenance and repair industry is a vast one. We ensure that your resume only reflects the right skills to get you seen by your preferred employer.",
            InvestSectionBox3Topic: "Highlight your problem-solving abilities",
            InvestSectionBox3Pera: "Maintenance and repair are always about troubleshooting. We understand that your resume must emphasize your ability to think on your feet.",
            //JobSearch
            JobSearchTopic: "How will Resume Mansion help you achieve your Maintenance and Repair job search goals?",
            JobSearchsubTopic1: "Industrial expertise",
            JobSearchsubPera1: "Our certified professional resume writers understand the demands of the maintenance and repair industry and know what employers are looking for.",
            JobSearchsubTopic2: "Highlight certifications and training",
            JobSearchsubPera2: "Employers pay a lot of attention to your certifications and training when it comes to maintenance and repair jobs. We will ensure that your resume highlights all the qualifications that make you a standout candidate.",
            JobSearchsubTopic3: "Polish your career",
            JobSearchsubPera3: "A Resume Mansion resume can give your career the professional touch it needs to catch the eye of even the toughest hiring managers.",
        },
        sales: {
            //hero section
            subNav: "Sales",
            title: "Sales Resume Writing Services",
            heroPera: "Do you feel that you are selling yourself short with your current resume? If you're applying for a job in the competitive world of sales, your resume needs to be top-notch whether you work in B2B, B2C, or retail sales. Resume Mansion understands what you need to do to get your resume seen by the hiring managers.",
            //Section 2
            Section2Topic: "Why should you select Resume Mansion for your Sales Resume?",
            Section2pera1: "Over the years, we have helped over 700,000 successful clients land their dream jobs. As a result, Resume Mansion’s certified professional resume writers have all the right experience in crafting polished resumes for the competitive world of sales and will ensure that your resume showcases your ability to close deals, manage client relationships, and hit quotas.",
            Section2pera2: "Our sales resumes are tailored to answer the specific needs of the sales niche from retail sales to SaaS. Our resume writers focus on the metrics that matter to make your resume shine in the job market. With a Resume Mansion’s sales resume, the ways you have contributed to revenue growth, client acquisition, and sales pipeline management will stand out like no other.",
            //Client Review
            ReviewTopic: "What do our clients say about our Sales Resumes?",
            Reviews: [
                { owner: "Lisa M., Account Manager", text: "I was an accounts manager for a decade. I needed a sales resume that could show off my numbers, and recently mentioned did just that. With my new resume, I landed an interview with a top company in my area and moved on to a higher-paying role." },
                { owner: "Mark T., Regional Sales Manager", text: "I didn't realize how much I was understanding my skills with my old resume. After I spoke with a senior resume writer from Resume Mansion, I was able to discuss my career goals. They did a great resume that got me to my current position. " },
            ],
            //Impression
            ImpressionTitle: "What will you receive?",
            ImpressionPera: "Resume Mansion’s sales resume writing packages are tailored to include targeted keyword-optimized sales resumes, cover letters, and LinkedIn profiles, we understand the importance of putting together a complementing job application portfolio. With us, you no longer have to worry whether your sales persona is fully persuasive to the potential employers.",
            //InvestSection
            InvestSectionTopic: "Why should you invest in a sales resume?",
            InvestSectionBox1Topic: "Highlight your sales achievements",
            InvestSectionBox1Pera: "Our resumes are built to enhance your achievements from he thinks smashing sales numbers to managing key accounts.",
            InvestSectionBox2Topic: "Tailored for sales roles",
            InvestSectionBox2Pera: "No matter whether you are in pharmaceutical sales or software sales we have got you covered. Our sales resumes are built to fit your niche and highlight the right skills.",
            InvestSectionBox3Topic: "Pitch yourself with confidence",
            InvestSectionBox3Pera: "The next time you attend an important job interview, carry your Resume Mansion resume with you. It will give you the confidence you need to sell your skills to a potential employer.",
            //JobSearch
            JobSearchTopic: "How does Resume Mansion help you achieve your sales job search goals?",
            JobSearchsubTopic1: "Deep understanding of sales",
            JobSearchsubPera1: "Our certified professional resume writers understand the sales industry and create resumes that speak the language of sales.",
            JobSearchsubTopic2: "Customized for your career level",
            JobSearchsubPera2: "Whether you are just starting out in sales or gunning for a VP role, other resumes are built to reflect your experience, skills, and qualifications.",
            JobSearchsubTopic3: "Turn your resume into a sales tool",
            JobSearchsubPera3: "The terrorists may be your biggest marketing tool in this job search. Collaborate with Resume Mansion and build the most important sales document of your job hunt.",
        },
        transportation: {
            //hero section
            subNav: "Transportation",
            title: "Transportation resume writing services",
            heroPera: "Ready to transport your career forward? Whether you are a logistic coordinator, airline pilot, or truck driver, your transportation resume needs to be as efficient as possible if you want to have the shortest job search. Let Resume Mansion gear up your job hunt with a tailored resume.",
            //Section 2
            Section2Topic: "Why is Resume Mansion the best place for a Transportation Resume?",
            Section2pera1: "As we mentioned, we have helped over 700,000 professionals find success in their job searches. The transportation industry is not an exception. Our certified professional resume writers know the importance of highlighting the necessary qualifications no matter where you are in your transportation career. Our transportation resumes are built to showcase your safety record, on-time delivery, certifications, etc.",
            Section2pera2: "We write resumes that put you in the first lane of your job search whether you are a long-haul driver or an air traffic controller. Let us take the reins of your job search and help you drive it forward!",
            //Client Review
            ReviewTopic: "What do our clients have to say about our Transportation Resumes?",
            Reviews: [
                { owner: "Jason P., Truck Driver", text: "I have been a truck driver for more than 10 years, but I had trouble getting my resume noticed by new employers. Resume Mansion gave me a total resume revamp. They highlighted my clean driving record and how I was experienced different types of cargo. Now I'm working for a better job with higher pay." },
                { owner: "Shannon K., Logistics Coordinator", text: "I was a logistics coordinator for a while and needed a resume that showcased my ability to help complex transport networks successfully. Resume Mansion helped make my experience shine on paper ensuring that I landed interviews with top employers in my industry." },
            ],
            //Impression
            ImpressionTitle: "What will you receive?",
            ImpressionPera: "Resume Mansion’s transportation resume writing packages are tailored to include resumes that showcase your experience, certifications, and transportation skills. We also offer matching cover letter writing and LinkedIn profile optimization services for transportation professionals who want to drive their job search forward.",
            //InvestSection
            InvestSectionTopic: "Why invest in a Transportation Resume?",
            InvestSectionBox1Topic: "Showcase your skills and certifications",
            InvestSectionBox1Pera: "Let your new Resume Mansion resume highlight the qualifications that make you a valuable asset for the transportation industry",
            InvestSectionBox2Topic: "Tailored for transportation roles",
            InvestSectionBox2Pera: "Whether you are a driver dispatcher or a fleet manager, our resumes are crafted to be customized for your target role and the specific requirements of the employers.",
            InvestSectionBox3Topic: "Put your career in the fast lane",
            InvestSectionBox3Pera: "With keyword-optimized ATS-friendly resumes that get you seen by the right people, you can move through the job search much faster.",
            //JobSearch
            JobSearchTopic: "How does Resume Mansion help you achieve your Job Search Goals?",
            JobSearchsubTopic1: "Industry knowledge",
            JobSearchsubPera1: "Our certified professional resume writers understand the transportation industry and have the know-how to highlight the right skills for your target position.",
            JobSearchsubTopic2: "Certifications and training",
            JobSearchsubPera2: "We ensure that your new resume includes all the necessary certifications and training that make you a perfect candidate for the position.",
            JobSearchsubTopic3: "A resume that moves you forward",
            JobSearchsubPera3: "Let your new resume take you to new places in your career. Resume Mansion will effectively highlight your best achievements for potential employers to see.",
        },

    };

    const currentContent = content[topic] || { title: "Page Not Found", description: "", subTopics: [] };

    return (
        <div className='class_continer'>
            <NavBar />
            <HeroSection
                title={currentContent.title}
                subNav={currentContent.subNav}
                heroPera={currentContent.heroPera}
            />

            <Section2
                Section2Topic={currentContent.Section2Topic}
                Section2pera1={currentContent.Section2pera1}
                Section2pera2={currentContent.Section2pera2}
            />
            <Reviews
                ReviewTopic={currentContent.ReviewTopic}
                Reviews={currentContent.Reviews}
            />
            <Impression
                ImpressionTitle={currentContent.ImpressionTitle}
                ImpressionPera={currentContent.ImpressionPera}
            />
            <InvestSection
                InvestSectionTopic={currentContent.InvestSectionTopic}
                InvestSectionBox1Topic={currentContent.InvestSectionBox1Topic}
                InvestSectionBox1Pera={currentContent.InvestSectionBox1Pera}
                InvestSectionBox2Topic={currentContent.InvestSectionBox2Topic}
                InvestSectionBox2Pera={currentContent.InvestSectionBox2Pera}
                InvestSectionBox3Topic={currentContent.InvestSectionBox3Topic}
                InvestSectionBox3Pera={currentContent.InvestSectionBox3Pera}
            />
            <JobSearch
                JobSearchTopic={currentContent.JobSearchTopic}
                JobSearchsubTopic1={currentContent.JobSearchsubTopic1}
                JobSearchsubPera1={currentContent.JobSearchsubPera1}
                JobSearchsubTopic2={currentContent.JobSearchsubTopic2}
                JobSearchsubPera2={currentContent.JobSearchsubPera2}
                JobSearchsubTopic3={currentContent.JobSearchsubTopic3}
                JobSearchsubPera3={currentContent.JobSearchsubPera3}
            />
            <Footer />
        </div>
    );
};

export default IndustryBase;
