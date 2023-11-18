import { useState } from "react"; //Hook ( añadir funcionalidad al componente de REACT 'utilidad')

// Podemos ponerle un valor predeterminado al userName o a cualquier prop por si en algun momento no nos viene esa prop y se quede con ese valor
// Siempre que inicialices una prop a un estado no se reinicializa, solo se inicializa una vez, no se propaga al hijo
// El estado tambien se inicializa una vez.
export function TwitterFollowCard({userName = 'unknown', children, initialIsFollowing}){
    //Primer valor es falso, segundo verdadero
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);


    const text = isFollowing ? 'Siguiendo' : 'Seguir';
    const buttonClassName = isFollowing 
    ? 'tw-followCard-button is-following' 
    : 'tw-followCard-button';

    const handleClick = ()=>{
        setIsFollowing(!isFollowing);
    }

    //const addAt = (userName) => `@${userName}`;
    //Nunca MODIFICAR UNA PROPIEDAD QUE LE PASES. Ejemplo: userName = `@${userName}`;. JAMÁS, LAS PROPS DEBEN SER INMUTABLES.
    //SI queremos modificar una PROP quizas lo mejor será crearte una const userNameConst = `@${userName}`;
    //Puedo añadir una prop children que sirve para la componetizacion que luego a la hora de llamarlo en el main puedo meter un elemento dentro de otro
    return(
        //Para añadir clases, siempre es className porque JSX nos convierte class en una palabra reservada.
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img 
                    className='tw-followCard-avatar'
                    alt="El avatar de KikoUguina" 
                    src={`https://unavatar.io/twitter/${userName}`}/>
                <div className='tw-followCard-info'>
                    <strong>{children}</strong>
                    <span className='tw-followCard-infoUserName'>{userName}</span>
                </div>
            </header>
            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    <span className="tw-followCard-text">{text}</span>
                    <span className="tw-followCard-stopFollow">Dejar de seguir</span>
                </button>
            </aside>
        </article>
    )
}