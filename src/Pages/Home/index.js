import React, { useState, useEffect, useDebugValue} from 'react';
import { Link } from 'react-router-dom';
import { PageArea, SearchArea } from './styled';
import { PageContainer } from '../../components/MainComponents';
import AdItem from '../../components/partials/AdItem';
import useApi from '../../helpers/OlxAPI';

const Page = () => {
    const api = useApi();

    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);

    useEffect(() => {
        const getStates = async () => {
            const sList = await api.getStates();
            setStateList(sList);

        }
        getStates(); 
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategorias();
            setCategories(cats);
        }
        getCategories();
    }, []);

    useEffect(() => {
        const getRecentAds = async () => {
            const json = await api.getAds({
                sort:'desc',
                limit: 8
            });
            setAdList(json.ads);
        }
        getRecentAds();
    }, []); 
    
    return (
     <>
          <SearchArea>
            <PageContainer>
                <div className="searchBox">
                    <form method="GET" action="/ads">
                        <input 
                           type="text"
                           nome='q'
                           placeholder="O que você procura?"
                           />
                           <select nome="state">
                            {stateList.map((i, k) =>
                                  <option key={k} value={i.name}>
                                    {i.name}
                                    </option>
                            )}
                           </select>
                           <button>Pesquisar</button>
                    </form>
                </div>
                <div className="caregoryList">
                    {categories.map((i, k) =>
                       <link
                           key={k}
                           to={`/ads?cat=${i.slug}`}
                           className="categoryItem"
                           >
                            <img src={i.img} alt="" />
                            <span>{i.name}</span>
                           </link>     
                    )}
                </div>
            </PageContainer>
          </SearchArea>
          <PageContainer>
            <PageArea>
                <h2>Anúncios Recentes</h2>
                <div className="list">
                   {adList.map((i, k) =>
                      <AdItem key={k} data={i} />
                    )}
                </div>
                <Link to="/ads" className="seeAllLink">Ver todos</Link>
                <hr />
                É um facto estabelecido de que um leitor é distraído pelo conteúdo legível 
                de uma página quando analisa a sua mancha gráfica. Logo, o uso de Lorem Ipsum 
                leva a uma distribuição mais ou menos normal de letras, ao contrário do uso 
                de "Conteúdo aqui, conteúdo aqui", tornando-o texto legível. Muitas ferramentas 
                de publicação electrónica e editores de páginas web usam actualmente o Lorem Ipsum 
                como o modelo de texto usado por omissão, e uma pesquisa por "lorem ipsum" 
                irá encontrar muitos websites ainda na sua infância.
            </PageArea>

          </PageContainer>
     </>
    )
}

export default Page