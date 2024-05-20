import { useRef } from "react";
function useSidebar(){
    const btnRef1 = useRef(null);
    const btnRef2 = useRef(null);
    const btnRef3 = useRef(null);
    const btnRef4 = useRef(null);
    return{btnRef1, btnRef2, btnRef3, btnRef4};
}
export default useSidebar;