import React, {useState, useEffect} from "react";
import {Alert, Button} from "react-bootstrap";

const Message = ({variant, children}) => {
    const [visibleAlert, setVisibleAlert] = useState(false);

    const handleVisible = () => {
        setVisibleAlert(true)
        setTimeout(() => {
            setVisibleAlert(false)
        }, 2000);
    }
    useEffect(() => {
        handleVisible()
    }, [])

    return <Alert show={visibleAlert} variant={variant} transition>{children}</Alert>;
};

Message.defaultProps = {
    variant: "info",
};

export default Message;
