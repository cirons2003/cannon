import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react"
import { useSelector } from "react-redux"


export default function DeleteConfirmation({isOpen, onClose, header, body, onDelete, logout }) {

    const colors = useSelector(state => state.theme.colors)

    return (
        <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        >
        <AlertDialogOverlay>
            <AlertDialogContent bg = {colors.secondary}>
            <AlertDialogHeader fontSize='lg' fontWeight='bold' color= {colors.red}>
                {header}
            </AlertDialogHeader>

            <AlertDialogBody>
                {body}
            </AlertDialogBody>

            <AlertDialogFooter>
                <Button bg = 'transparent' onClick={onClose}>
                Cancel
                </Button>
                <Button bg = {colors.red} onClick={onDelete} ml={3} color = 'white'>
                {logout ? 'Logout' : 'Delete'}
                </Button>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialogOverlay>
        </AlertDialog>
    )
}