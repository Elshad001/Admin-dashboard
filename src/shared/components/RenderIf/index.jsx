
// eslint-disable-next-line react/prop-types
const RenderIf = ({children,condition,renderElse = ""}) =>{
    if(condition) return <>{children}</>
    return renderElse
}
export default RenderIf

