import { Fragment, ReactNode, useEffect, useLayoutEffect, useState } from "react";

type Props = {
	children: ReactNode;
}

function NoSSR(props: Props) {
	const [mountedState, setMountedState] = useState(false);
	const useEnhancedEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
	const defer = false;

	useEnhancedEffect(() => {
		if (!defer) {
			setMountedState(true);
		}
	}, [defer]);

	useEffect(() => {
		if (defer) {
			setMountedState(true);
		}
	}, [defer]);

	return <Fragment>{mountedState ? props.children : undefined}</Fragment>;
}

export default NoSSR