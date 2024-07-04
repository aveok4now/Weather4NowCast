import { useEffect } from "react";

const KEY_NAME_ESC = "Escape";
const KEY_EVENT_TYPE = "keyup";

const useEscapeKey = (handleClose: () => void) => {
	const handleEscKey = (event: KeyboardEvent) => {
		if (event.key === KEY_NAME_ESC) {
			handleClose();
		}
	};

	useEffect(() => {
		document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);
		return () => {
			document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
		};
	}, [handleEscKey]);
};

export default useEscapeKey;
