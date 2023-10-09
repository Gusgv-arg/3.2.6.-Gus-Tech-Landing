import React, { useEffect } from "react";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export const Modal1 = function () {
    const { isOpen, onOpen, onClose } = useDisclosure();

    /* const handleOpen = (backdrop) => {
        setBackdrop(backdrop)
        onOpen();
    } */
useEffect(()=>{
onOpen()
},[])
    

    return (
        <>
            <Modal backdrop="opaque"  isOpen={isOpen} onClose={onClose} size="2xl">
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">¿Sabías?</ModalHeader>
                    <ModalBody>
                        <p>
                            Este ChatBot fue entrenado para responder preguntas específicas de nuestro servicio para implementar uno similar en tu negocio!
                        </p>
                        <p>
                            La información puede provenir de la fuente que vos quieras: página web, pdf, word, texto simple, etc.
                        </p>
                        <p>
                            !Sigamos conversando! 🙂
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Cerrar
                        </Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    );
}
