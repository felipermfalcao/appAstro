import React, {useState, useEffect, createContext} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider ({children}){
    const [dadosUser, setDadosUser] = useState(null);
    const [userLogado, setUserLogado] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false);
    
    useEffect(()=>{
        async function loadStorage(){
            const informacoesUser = await AsyncStorage.getItem('userData');

            if(informacoesUser)
            {
              setLoading(false);
              const dadosStorageUSer = JSON.parse(informacoesUser);
              if (dadosStorageUSer.ativo == 1)
              {
                setDadosUser(dadosStorageUSer);
                setUserLogado(1);                
              }
            }
            
            setLoading(false);

        }

        loadStorage();
    }, [])

    async function Login(nomeUsuario, senha) {
        setLoadingAuth(true);

       await fetch('https://felipefalcao.com.br/appAstro/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `nome_usuario=${nomeUsuario}&senha=${senha}`,
        })
          .then((response) => response.json())
          .then((responseJson) => {
            // Se o PHP retornar um token de acesso, armazene-o em um local seguro
            if (responseJson.token) {
                
                let data = {
                    id: responseJson.id,
                    usuario: responseJson.usuario,
                    token: responseJson.token,
                    validade: responseJson.validade,
                    ativo: responseJson.ativo
                };
                
                
                storageUser(data);
                setDadosUser(data);
                setUserLogado(1);
                setLoadingAuth(false);
              
              //alert(responseJson.token);
            } else {
              // Se o PHP retornar um erro, exiba-o para o usuário
              alert(responseJson.error);
              setLoadingAuth(false);
            }
          })
          .catch((error) => {
            console.error(error);
            alert('Aconteceu algum erro com o servidor backend');
          });
      }

    return(
        <AuthContext.Provider value={{logado: userLogado, Login, loadingAuth, dadosUser, loading}}>
            {children}
        </AuthContext.Provider>
    );
}

async function Logout(){
    await AsyncStorage.clear()
    .then(()=> {
        setUserLogado(0);        
    })    
}

async function storageUser(data){
    await AsyncStorage.setItem('userData', JSON.stringify(data));
}

export default AuthProvider;