'use client'

import { useEffect } from "react";

function new_script(src) {
  return new Promise(function(resolve, reject){
    if (typeof window !== "undefined") {
      var script = window.document.createElement('script');
      script.src = src;
      script.addEventListener('load', function () {
        resolve();
      });
      script.addEventListener('error', function (e) {
        reject(e);
      });
      window.document.body.appendChild(script);
    }
  })
};

export default function Mermaid({chart}) {
    useEffect(() => {
        if (!window.mermaid) {
            var my_script = new_script('https://cdnjs.cloudflare.com/ajax/libs/mermaid/9.3.0/mermaid.min.js');
            my_script.then(() => {
                window.mermaid.mermaidAPI.initialize({
                    securityLevel: 'loose',
                });
                window.mermaid.contentLoaded();
            });
        }
    }, [])

    return <div className="mermaid">{chart}</div>;
}
