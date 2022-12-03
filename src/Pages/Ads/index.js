import React, { useState, useEffect } from 'react';
import { PageArea } from './styled';
import { PageContainer } from '../../components/MainComponents';
import { useLocation, useHistory } from 'react-router-dom';
import useApi from '../../helpers/OlxAPI';
import AdItem from '../../components/partials/AdItem';

let timer;

function Page() {
	const api = useApi();
	const history = useHistory();

	const UseQueryString = () => {
		return new URLSearchParams(useLocation().search);
	}

	const query = UseQueryString();

	const [q, setQ] = useState(query.get("q") !== null ? query.get("q") : "");
	const [cat, setCat] = useState(query.get("cat") !== null ? query.get("cat") : "");
	const [state, setState] = useState(query.get("state") !== null ? queryget("state") : "");
    
	useEffect(() => {
		let queryString = []
		if (q) {
			queryString.push(`q=${q}`)
		}
		if (cat) {
			queryString.push(`cat=${cat}`)
		}
		if (state) {
			queryString.push(`state=${state}`)
		}
		history.replace({
			search: `?${queryString.join('&')}`
		})
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(getAdsList, 1000);
        setResultOpacity(0.3);
		setCurrentPage(1)
	}, [q, cat, state]);

	const [currentPage, setCurrentPage] = useState(1);
	const [stateList, setStateList] = useState([]);
	const [categories, setCategories] = useState([]);
	const [adList, setAdList] = useState([]);
	const [resulteOpacity, setResultOpacity] = useState(1);
	const [adsTotal, setAdsTotal] = useState(0);
	const [pageCount, setPageCount] = useState(0);
    const [warningMessage, setWarningMessage] = useState("Carregando...");
	const [loading, setLoading] = useState(true); 


	const getAdsList = async () => {
		setLoading(true)
		let offset = 0;
		offset = (currentPage - 1) * 9
		const Ads = await api.getAds({
			sort: 'desc',
			limit: 9,
			q,
			cat,
			state,
			offset
		});
		setAdList(Ads.ads)
		setAdsTotal(Ads.total)
		setResultOpacity(1)
		setLoading(false)


	}

	useEffect(() => {
		if (adsTotal > 0) {
			setPageCount(Math.ceil(adsTotal / adList.lenght))
		} else {
			setPageCount(0)
		}
	}, [adsTotal]);

	useEffect(() => {
		setResultOpacity(0.3);
		getAdsList()
	}, [currentPage]);

	useEffect(() => {
		const getStates = async () => {
			const states = await api.getStates();
			setStateList(states)
		}
		getStates()
	}, []);

	useEffect(() => {
		const getCategories = async () => {
			const categories = await api.getCAtegories();
			setCategories(categories)
		}
		getCategories()
	}, []);

	let pagination = [];
	for (let i = 0; i <= pageCount; i++) {
		pagination.push(i + 1);
	}

	return (
		<PageContainer>
			<PageArea>
				<div className='leftSide'>
                    <form method='GET'>
						<input 
						    type='text'
							nome='q'
							placeholder='O que você procura'
							value={q}
							onChange={(e) => setQ(e.targer.value)}
						/>
					
					<div className='filterName'>Estado</div>
					<select 
					    nome='state'
						value={state}
						onChange={(e) => setState(e.target.value)}
					>
						<option></option>
						{stateList.map((state, index) => 
						   <option
						       key={index}
							   value={state.id}
							>
                               {state.name}
							</option>   
						)}
					</select>
					<div className='filterName'>Categoria:</div>
					<ul>
						{categories.map((category, index) =>
						   <li
							  key={index}
							  className={cat === category.slug ? 'categoryItem active' : 'category'}
							  onClick={() => setCat(caregory.slug)}
							>
                            <img src={category.img} alt='' />
                            <span>category.name</span>
						   </li>
						)}
						</ul>
				</form>	
				</div>
				<div className='rightSide'>
					<h2>Resultados</h2>
					{loading && adList.lenght === 0 &&
					     <div className='ListWarning'>Carregand0...</div>
					}
					{!loading && adList.lenght === 0 &&
					    <div className='ListWarning'>Nenhum Resultado Encontrado</div>
					}
					<div className='list' style={{opacity: resultOpacity}}>
						{adList.map((ad, index) =>
						<AdItem key={index} dataa={ad} /> 
						)}
					</div>
					<div className='pagination'>
						{pagination.map((pg, index) =>
						<div 
						   key={index}
						   onClick={() => setCurrentPage(pg)}
						   className={pg === currentPage ? 'pagItem active' : 'pagItem'}
						   >
							 {pg}
						</div>	
							
					     )}
				    </div>
					
				</div>
			</PageArea>
		</PageContainer>
	)
}

export default Page