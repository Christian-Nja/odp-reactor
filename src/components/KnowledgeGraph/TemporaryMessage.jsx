import React, { useState } from "react";
import { useEffect } from "react";

export default function TemporaryMessage({
    message,
    delay = 3000,
    style = {},
}) {
    const [disappear, setDisappear] = useState("");
    // useEffect(() => {
    //     const hideTimeout = setTimeout(() => {
    //         setDisappear("none");
    //     }, delay);
    //     return () => {
    //         if (hideTimeout) {
    //             clearTimeout(hideTimeout);
    //         }
    //     };
    // }, []);

    // not working to much rerendering !!!!!!!!!
    const helpToken = window.sessionStorage.getItem("help");
    if (!helpToken) {
        window.sessionStorage.setItem("help", "yes");
    }
    console.log("HelpToken");
    console.log(helpToken);

    return (
        <div
            style={{ ...style, display: disappear }}
            className={!helpToken ? "shaking" : ""}
        >
            <i aria-hidden="true" class="info icon"></i>
            {message}
        </div>
    );
}