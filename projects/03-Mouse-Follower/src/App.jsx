import { useEffect, useState } from "react"

const FollowMouse = () =>{
    const [enabled, setEnabled] = useState(false);
    const [position, setPosition] = useState({x:0, y:0});

    //Effect que maneja el movimiento del mouse y actualiza la posición
    useEffect(()=>{
        const handleMove = (event) => {
            const {clientX, clientY} = event;
            setPosition({x:clientX, y:clientY});
        }
        if (enabled) {
            window.addEventListener('pointermove', handleMove);
        }
    
        //Hay que limpiar el listener cuando se activa de esta manera.
        //Hay un metodo para ver si se esta acumulando el eventlistener y es el objeto.getEventListener()
        //le ejecutariamos en la consola de desarolladores para ver si se acumula o no.
        //Se ejecuta cuando el componente de desmonta, cambian dependecias, antes de ejecutar.
        return () => {
            window.removeEventListener('pointermove', handleMove);
        }

    },[enabled])
    
    //[] -> solo se ejecutas una vez cuando se monta el componente
    //[enabled] -> se ejecuta cuando cambia enabled y cuando se monta el componente
    //undefined -> se ejecuta cada vez que se renderiza el componente

    //Change body classes and make cursor disappear.
    useEffect(()=>{
        document.body.classList.toggle('no-cursor', enabled);

        return () => {
            document.body.classList.remove('no-cursor');
        }
    }, [enabled])
    return (
        <>
            <div 
                style={{
                    position: 'absolute',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid #fff',
                    borderRadius: '50%',
                    opacity: 0.8,
                    pointerEvents: 'none',
                    left: -25,
                    top: -25,
                    width: 50,
                    height: 50,
                    transform: `translate(${position.x}px, ${position.y}px)`
                }}
            />
            
            <button onClick={() => setEnabled(!enabled)}>
                {enabled ? 'Desactivar' : 'Activar'} seguir puntero
            </button>
        </>
        
    )
}



function App() {
    return (
        <main>
            <FollowMouse />
        </main>
    )
}
    
export default App
    