import { observer } from "mobx-react-lite"
import { Modal } from "react-bootstrap"
import { Gems } from "../gems"
import { GemsArchive } from "../gems-archive"

export const GemsArchiveModal = observer((props) => {
    return (
        <>
            <Modal
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{margin:'70px 0',padding:'0 0 100px 0'}}
            >
                <Modal.Body style={{ backgroundColor: '#212529', border: '2px solid yellow', display: "flex", justifyContent: 'center' }}>
                    <GemsArchive />
                </Modal.Body>
            </Modal>
        </>
    )
})