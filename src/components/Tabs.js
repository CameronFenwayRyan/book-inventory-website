import React, { useState } from 'react';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleTabClick = (label) => {
    setActiveTab(label);
  };

  return (
    <div>
      <div className="tabs">
        {children.map((child) => (
          <button
            key={child.props.label}
            className={child.props.label === activeTab ? 'active' : ''}
            onClick={() => handleTabClick(child.props.label)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {children.map((child) => {
          if (child.props.label === activeTab) {
            return <div key={child.props.label}>{child.props.children}</div>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Tabs;