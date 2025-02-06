import React, { useState } from 'react';
import './Accomplishments.css';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

function Accomplishments() {
  const [startCount, setStartCount] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once when it comes into view
    threshold: 0.5, // Trigger when 50% of the component is visible
    onChange: (isVisible) => setStartCount(isVisible),
  });

  return (
    <div className="continer_main_box" ref={ref}>
      <div className='container'>
        <div className="accomplishments_continer">
          <div className="accomplishments_continer_card_one">
            <p className="accomplishments_continer_card_topic">
            Our Best Accomplishments So Far
            </p>
            <p className="accomplishments_continer_card_pera">
            These milestones signify how far we have come in our journey of empowering the US job seeker. 
            </p>
          </div>
          <div className='counting_boot'>
            <div className="accomplishments_continer_card">
              <p className="accomplishments_continer_card_topic">
                {startCount ? <CountUp start={0} end={550} duration={2} suffix="+" /> : '550k+'}
              </p>
              <p className="accomplishments_continer_card_pera">Job seekers helped</p>
            </div>
            <div className="accomplishments_continer_card">
              <p className="accomplishments_continer_card_topic">
                {startCount ? <CountUp start={0} end={10} duration={2} suffix="+" /> : '10k+'}
              </p>
              <p className="accomplishments_continer_card_pera">Clients hired by Fortune 500 companies</p>
            </div>
            <div className="accomplishments_continer_card">
              <p className="accomplishments_continer_card_topic">
                {startCount ? <CountUp start={0} end={100} duration={2} suffix="k" /> : '100+'}
              </p>
              <p className="accomplishments_continer_card_pera">Professional resume writers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accomplishments;
