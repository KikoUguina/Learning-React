import { useState } from 'react';
import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

const users=[
    {
        userName :'elonmusk',
        name: 'Elon Musk',
        isFollowing: true
    },
    {
        userName:'kikouguina',
        name: 'Kiko Uguina',
        isFollowing:false
    },
    {
        userName:'midudev',
        name: 'Miguel Ángel Durán',
        isFollowing:true
    },
    {
        userName:'isaagc.17_',
        name: 'Isabel Gómez Carballo',
        isFollowing:false
    }
]

export function App (){
    //const format = (userName) => `@${userName}`;

    //Pasar objeto como props. No suele ser correcto. Pueda ser que haga que el componente se renderice sin necesidad.
    //1. const kikouguina = {isFollowing : false, userName: 'kikouguina', formatUserName: format}

    //const [name, setName] = useState('kikouguina');
    //const [setIsFollowing, initialIsFollowing] = useState(false);
    
    return(
        // El <> </> es el <React.fragment></React.fragment>
        <section className='App'>
            {
                users.map(user =>{
                    const {userName, name, isFollowing} = user;
                    return (
                        <TwitterFollowCard key={userName} userName={userName} initialIsFollowing={isFollowing}>
                            {name}
                        </TwitterFollowCard>
                    )
                })
            }
            {/*1. Aqui le pasamos como prop un objeto con sus props con el {... nombreObjeto} 
            {
            /* <TwitterFollowCard formatUserName={format} userName={name} initialIsFollowing={true}>
                {/* Este seria la prop children que le pasamos al elemento 
                <span>Kiko Uguina</span>
            </TwitterFollowCard>

            <TwitterFollowCard formatUserName={format} userName={'midudev'} initialisFollowing>
                <span>Miguel Ángel Durán</span>
            </TwitterFollowCard> 

             <button onClick={() => setName('jimbo4XL')}>
                Cambiar de nombre
            </button> */
            }
        </section>
    )
}