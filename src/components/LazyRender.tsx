import { useState, useEffect, useRef, type FC } from "react";
import * as React from "react";

type LazyRenderProps = {
    children: React.ReactNode;
    style?: React.CSSProperties;
};

export const LazyRender: FC<LazyRenderProps> = ({ children, style = {} }) => {
    const [hasBeenVisible, setHasBeenVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasBeenVisible) {
                    setHasBeenVisible(true);
                }
            },
            { rootMargin: "200px" }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [hasBeenVisible]);

    return (
        <div className="h-max" ref={ref} style={style}>
            {hasBeenVisible ? children : null}
        </div>
    );
};
