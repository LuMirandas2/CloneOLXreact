import React,
       { 
		   useState,
		   useEffect,
		   useRef
		    
} from 'react';
import { PageArea, ModalAll } from './styled';
import {
	PageContainer,
	PageTitle,
	ErrorMessage
} from '../../components/MainComponents';
import useApi from '../../helpers/OlxAPI';
import { Slide } from 'react-slideshow-image';
import "react-slideshow-image/dist/styles.css";
import MaskedInput from 'react-text-mask';
import { createNumberMask } from 'text-mask-addons';

const Page = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 2,
		resposive: [
			{
				breackpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					dots: true
				}
			}
		]



	};	
	
	const api = useApi();
	const fileField = useRef();

	const [user, setUser] = useState({});
	const [disabled, setDisabled] = useState(false);
	const [adsList, setAdsList] = useState([]);

	const [nameUser, setNameUser] = useState('');
	const [emailUser, setEmailUser] = useState('');
	const [stateUser, setStateUser] = useState('');
	const [stateList, setStateList] = useState([]);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');


    const [categories, setCategories] = useState([]);

	const [visibleModal, setVisibleModal] = useState(false);
	const [adsStatusModal, setAdsStatusModal] = useState(false);
	const [adTitleModal, setAdTitleModal] = useState("");

	const [categoryModal, setCategoryModal] = useState('');
	const [priceModal, setPriceModal] = useState('');
	const [priceNegotiableModal, setPriceNegotiableModal] = useState(false);
	const [descriptionModal, setDescriptionModal] = useState=('');
	const [imagesModal, setImagesModal] = useState([]);
	const [getIdAdModal, setGetIdAdModal] = useState('');


 
	useEffect(() => {
		const getStates = async () => {
			const sList = await api.getState();
			setStateList(sList);
		}
		getStates();
	 }, []);

	useEffect(() => {
		const getCategories = async () => {
			const resp = await api.getCategories();
			setCategories(resp);
		}
		getCategories();
	}, []);

	useEffect(() => {
		const getUser = async () => {
			const resp = await api.getUser();
			setAdsList(resp.ads);
			setUser(resp);
			setNameUser(resp.name);
			setEmailUser(resp.mail);
		}
		getUser();
	})

	useEffect(() => {
		if(user) {
			state.map(function (item) {
				if(item.name === user.state) {
					setStateUser(item._id);
				}
			})
		}
	}, {user});

	const handleSumit = async (e) => {
		e.preventDefault();
		setDisabled(true);
		stateList.map(function (item) {
			if(item._id === stateUser) {
				setStateUser(item.name);
			}
		});
		const resp = await api.updateUser(nameUser, emailUser, stateUser, password);
		if (resp.error) {
			setError(resp.error);
		} else {
			window.location.href = '/my-account';
		}
		setDisabled(false);
	}

	const handleSumitModal = async (e) => {
		e.preventDefault();
		setDisabled(true);
		setError('');
		let errors= [];
		if(!adTitleModal.trim()) {
			errors.push("Título obrigatório")
		}
		if(!categoryModal.trim()) {
			errors.push("É necessário informar uma categoria")
		}
		if(errors.leght === 0) {
           const formData = new FormData();
		   formData.append("status", adsStatusModal);
		   formData.append("title", adTitleModal);
		   formData.append("price", priceModal);
		   formData.append("priceneg", priceNegotiabled);
		   formData.append("desc", descriptionModal);
		   formData.append("cat", categoryModal)


		   if(fileField.current.files.lenght > 0) {
			   for(let i=0; i < fileField.current.files.lenght; i++) {
				 formData.append("img", fileField.current.files.lenght[i]);


			   }

		   }

		   const response = await api.updateAd(formData, getAdModal);
        if(!response.error) {
			window.location.href = '/my-account';
		} else {
			setError(response.error);
		}
	}  else {
		setError(errors.join("\n"));
	}
     	setDisabled(false);
		setVisibleModal(false);
	};


	const priceMask = createNumberMask({
		prefix: 'R$ ',
		icludeThousandsSeparator: true,
		thounsandsSeparatorSymbol: '.',
		allowDecimal: true,
		decimalSymbol: ','

	 });

	 function openModal(props) {
		categories.map((item) => {
			if(item.slug === props.category) {
				setCategoryModal(item._id);
			}
			return "";
		});
		setAdsStatusModal(props.status);
		setAdTitleModal(props.title);
		setPriceNegotiableModal(props.priceNegotiableModal);
		setPriceModal(props.price);
		setDescriptionModal(props.descriptionModal);
		setImagesModal(props.images);
		setGetIdAdModal(props.id);
		setVisibleModal(true);

	 }


	return (
		<PageContainer>
			<PageTitle>
				Minha Conta
			</PageTitle>
			<PageArea>
				{error &&
					<ErrorMessage>
						{error}
					</ErrorMessage>
				}
				<div className='pageTop'>
					<div className='pageTopLeft'>
                        <div className='imgProfile'>
							<img src='https://i1.sndcdn.com/avatars-000205498235-o6x5yu-t500x500.jpg' alt='profile' />
						</div>
						<div className='infoProfile'>
							<h1>
								{user &&
							       user.name
								}
							</h1>
							<p>
								{user &&
							       user.email
								}
							</p>
						</div>
					</div>
					<div className='pageTopRight'>
                        <form onSubmit={handleSubmit} className='formRight'>
						    <label className="area">
					 	        <div className="area--title">
							         Nome Completo
						        </div>
						        <div className="area--input">
							        <input
								        type="text"
								        disabled={disabled}
								        value={nameUser}
								        onChange={e => setNameUser(e.target.value)}
								        required
							        />
					            </div>
					        </label>
							<label className="area">
						<div className="area--title">
							Estado
						</div>
						<div className="area--input">
							<select
								required
								disabled={disabled}
								value={stateUser}
								onChange={e => setStateUser(e.target.value)}
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
						</div>
					</label>
					<label className="area">
						<div className="area--title">
							E-mail
						</div>
						<div className="area--input">
							<input
								type="email"
								disabled={disabled}
								value={emailUser}
								onChange={e => setEmailUser(e.target.value)}
								required
							/>
						</div>
					</label>
					<label className="area">
						<div className="area--title">
							Nova Senha
						</div>
						<div className="area--input">
							<input
								type="password"
								disabled={disabled}
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
							<span>Para manter a senha atual, deixe vazio</span>
						</div>
					</label>
					<label className="area">
						<div className="area--title">
						</div>
						<div className="area--input">
							<button disabled={disabled}>Atualizar</button>
						</div>
					</label>
						</form>
					</div>
				</div>
				<PageTitle>
					Meus Anuncios
				</PageTitle>
				<div className='pageBottom'>
					{adList &&
					   <Slide {...settings}>
						   {adList.map((ad, index) =>
						      <div key={index} onClick={() => openModal(ad)}>
								  <AdItem key={index} data={ad} />
							  </div>
						   )}
					   </Slide>
					}
				</div>
			</PageArea>

			{visibleModal &&
			    <Modal 
				    title={adTitleModal}
				    visibleModal={visibleModal}
				    setVisibleModal={setVisibleModal}
				>
					<ModalAll>
						<fomr onSubmit={handleSumitModal}>
							<div className='modalContent'>
							<label className="area">
						<div className="area--title">
							Título
						</div>
						<div className="area--input">
							<input
								type="text"
								disabled={disabled}
								value={adTitleModal}
								onChange={e => setTitle(e.target.value)}
								required
							/>
						</div>
					</label>
					<label className="area">
						<div className="area--title">
							Categoria
						</div>
						<div className="area--input">
							<select
								required
								disabled={disabled}								
								onChange={e => setCategoryModal(e.target.value)}
							>
								<option></option>
								{categories && 
								   categories.map((catego) => (
									<option
										key={catego._id}
										value={catego._id}
									>
										{catego.name}
									</option>
								))}
							</select>
						</div>
					</label>
					<label className="area">
						<div className="area--title">
							Preço
						</div>
						<div className="area--input">
							<MaskedInput
							    mask={priceMask}
								placeholder="R$ "
								disabled={disabled || priceNegotiabled}
								value={priceModal}
								onChange={e => setPriceModal(e.target.value)}
								required
							/>
						</div>
					</label>
					<label className="area">
						<div className="area--title">
							Preço Negociável
						</div>
						<div className="area--input">
							<input
							    
								type="checkbox"
								disabled={disabled}
								onChange={e => setpriceNegotiable(!priceNegotiabled)}
								checked = {priceNegotiabled}
							/>
						</div>
					</label>
					<label className="area">
						<div className="area--title">
							Descrição
						</div>
						<div className="area--input">
							<textarea
								disabled={disabled}
								value={descriptionModal}
								onChange={e => setDescriptionModal(e.target.value)}
							></textarea>
						</div>
					</label>
					<label className="area">
						<div className="area--title">
							Imagens (1 ou mais)
						</div>
						<div className="area--input">
							<input
								type="file"
								disabled={disabled}
								hRef={fileField}
								multiple
							/>
						</div>
					</label>
					<label className="area">
						<div className="area--title">
						</div>
						<div className="area--input">
							<button disabled={disabled}>Atualizar</button>
						</div>
					</label>
							</div>
						</fomr>
					</ModalAll>
				</Modal>
			}
		</PageContainer>
	);
};

export default Page