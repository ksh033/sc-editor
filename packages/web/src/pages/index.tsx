import { useEffect } from 'react';
// @ts-ignore
import Editor from '@sceditor/editor-core';

export default function IndexPage() {
  // document.domain = '192.168.31.182';
  useEffect(() => {
    console.log(window.location, '12');
  }, []);
  return (
    <Editor iframeUrl="http://192.168.31.181:10086/#/pages/preview/index" />
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
