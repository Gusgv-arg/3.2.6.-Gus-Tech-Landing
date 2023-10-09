import React from "react";
import { Input, Button, Textarea } from "@nextui-org/react";


export default function DataForm() {
  const [mail, setMail] = React.useState("");
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [apiResponse, setApiResponse] = React.useState(null);

  const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = React.useMemo(() => {
    if (mail === "") return false;
    return validateEmail(mail) ? false : true;
  }, [mail]);

  const submitHandler = async function (event) {
    event.preventDefault();
    const lead = { name: name, email: mail, message: message }
    try {
      const response = await fetch(
        "http://localhost:4000/chatGpt/leads",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(lead)
        }
      );
      const data = await response.json();
      setApiResponse(data.message)
      console.log(data)
    } catch (error) {
      setApiResponse(error.message)
    }
  }

  return (
    <>
      <div className="dataForm">
        <div className="">
          <p className="">¿Querés enviarnos un mensaje? !Sino seguí conversando!</p>
        </div>

        <div className="">
          <form className="" onSubmit={submitHandler}>
            <Input
              isClearable
              size="sm"
              isRequired
              value={name}
              type="string"
              label="Nombre"
              variant="bordered"
              color="default"
              onValueChange={setName}
              className="max-w-xs inputForm"
            />
            <Input
              isClearable
              size="sm"
              isRequired
              value={mail}
              type="email"
              label="Mail"
              variant="bordered"
              //color= "success"
              isInvalid={isInvalid}
              color={isInvalid ? "default" : "success"}
              errorMessage={isInvalid && "Por favor ingrese un mail válido"}
              onValueChange={setMail}
              className="max-w-xs inputForm"
            />
            <Textarea
              variant="bordered"
              placeholder="Escribinos tu mensaje..."
              color="default"
              value={message}
              onValueChange={setMessage}
              className="max-w-xs inputForm "
            />
            <div>
            <Button type="submit" className="inputFormButton" size="sm" color="default" variant="solid">Enviar</Button>
            {apiResponse ? apiResponse : ""}
            <br/>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

