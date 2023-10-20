import React,{ useEffect } from 'react';

import {Editor,Version} from '@sceditor/element';

export default function IndexPage() {
  // document.domain = '192.168.31.182';
  useEffect(() => {
    console.log(window.location,Version);
  }, []);
  return (
    <Editor iframeUrl="http://127.0.0.1:10086/#/pages/preview/index" />
  );
}

// const Decorate: React.FC<any> = () => {
//   const { origin } = window.location;
//   useEffect(() => {
//     console.log(window.location);
//   }, []);

//   return <Editor iframeUrl={`${origin}/preview`} />;
// };

// export default Decorate;
