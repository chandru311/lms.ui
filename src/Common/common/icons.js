import { faCheck, faCopy, faDownload, faEye, faPenToSquare, faPlus, faTrash, faUserCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const activate = () =>{
    return(
        <FontAwesomeIcon icon={faCheck} />
    )
}
export const deactivate = () =>{
    return(
        <FontAwesomeIcon icon={faX} />
    )
}
export const edit = () =>{
    return(
        <FontAwesomeIcon icon={faPenToSquare} />
    )
}
export const approve = () =>{
    return(
        <FontAwesomeIcon icon={faUserCheck} />
    )
}
export const trash = () =>{
    return(
        <FontAwesomeIcon icon={faTrash} />
    )
}
export const copy = () =>{
    return(
        <FontAwesomeIcon icon={faCopy} />
    )
}
export const download = () =>{
    return(
        <FontAwesomeIcon icon={faDownload}/>
    )
}
export const view = () =>{
    return(
        <FontAwesomeIcon icon={faEye}/>
    )
}
export const plus = () =>{
    return(
        <FontAwesomeIcon icon={faPlus} />
    )
}