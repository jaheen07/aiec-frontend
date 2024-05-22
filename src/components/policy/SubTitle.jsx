import React from 'react';

const SubTitle = ({ subtitles }) => {
  return (
    <div
      
      className="pl-2 mx-6 space-y-2 text-lg border-l-2 border-red-500"
    >
      {subtitles.map((subtitle) => (
        <a href={`#${subtitle}`} className="block" key={subtitle}>{subtitle}</a>
      ))}
    </div>
  );
};

export default SubTitle;
