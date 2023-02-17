import React, { useEffect, useState } from 'react'
import AddDishModal from '../../../components/addModal/AddDishModal'
import AddHourModal from '../../../components/addModal/AddHourModal'
import AddMenuModal from '../../../components/addModal/AddMenuModal'
import UpdateDaysModal from '../../../components/updateModal/UpdateDaysModal'
import UpdateDishModal from '../../../components/updateModal/UpdateDishModal'
import UpdateHoursModal from '../../../components/updateModal/UpdateHoursModal'
import UpdateMenuModal from '../../../components/updateModal/UpdateMenuModal'
import GetDays from '../../../libs/days/GetDays'
import GetDish from '../../../libs/dish/GetDish'
import GetMenu from '../../../libs/menu/GetMenu'
import GetOpenHours from '../../../libs/openHours/GetOpenHours'
import DaysFormat from '../../../utils/DaysFormat'
import { FormatPrice } from '../../../utils/PriceFormat'
import TimeFormat from '../../../utils/TimeFormat'
import { FiTrash2 } from 'react-icons/fi'
import DeleteDish from '../../../libs/dish/DeleteDish'
import DeleteMenu from '../../../libs/menu/DeleteMenu'
import Loading from '../../../components/Loading'

export default function Admin() {

	const [dishs, setDishs] = useState()
	const [menus, setMenu] = useState()
	const [days, setDays] = useState()
	const [openHours, setOpenHours] = useState()
	const [addModal, setAddModal] = useState(null)
	const [updateModal, setUpdateModal] = useState(null)
	const [idUpdate, setIdUpdate] = useState(null)
    const [loading, setLoading] = useState(false);

	useEffect(() => {
		getResourses()
	}, [])

	async function getResourses() {
		setDishs(await GetDish())
		setMenu(await GetMenu())
		setDays(await GetDays())
		setOpenHours(await GetOpenHours())
	}

	function onSetAddModal(type) {
		setAddModal(type)
	}
	function onSetUpdateModal(type, id) {
		setIdUpdate(id)
		setUpdateModal(type)
	}
	async function handleDelete(type, id) {
		setLoading(true)
		switch (type) {
			case 'dish':
				await DeleteDish(id)
				break;
			case 'menu':
				await DeleteMenu(id)
				break;
			default:
				break;
		}

		setLoading(false)
		getResourses()
	}

	return (
		<div className='admin'>
			<h2>Page Administration</h2>
			<section>
				<h3>Plats</h3>
				<table>
					<tbody>
						{dishs && dishs.map(dish =>
							<tr key={dish.id}>
								<td>{dish.type}</td>
								<td>{dish.name}</td>
								<td>{FormatPrice(dish.price)}</td>
								<td><button onClick={() => onSetUpdateModal('dish', dish.id)}>Modifier</button></td>
								<td>{loading ? 
									<Loading /> 
									: <button onClick={() => handleDelete('dish', dish.id)}><FiTrash2 /></button>}
								</td>
							</tr>
						)}
					</tbody>
				</table>
				<button onClick={() => onSetAddModal('dish')}>Ajouter</button>
			</section>
			<section>
				<h3>Menus</h3>
				<table>
					<tbody>
						{menus && menus.map(menu =>
							<tr key={menu.id}>
								<td>{menu.name}</td>
								<td>{FormatPrice(menu.price)}</td>
								<td>{menu.type}</td>
								<td><button onClick={() => onSetUpdateModal('menu', menu.id)}>Modifier</button></td>
								<td>{loading ? 
									<Loading /> 
									: <button onClick={() => handleDelete('menu', menu.id)}><FiTrash2 /></button>}
								</td>
							</tr>
						)}
					</tbody>
				</table>
				<button onClick={() => onSetAddModal('menu')}>Ajouter</button>
			</section>
			<section>
				<h3>Horraires</h3>
				<div className="horraires-content">
					<div className='days-legend'>
						<div className='col'><span className='red'></span>Ouvert toutes la journée</div>
						<div className='col'><span className='green'></span>Midi uniquement</div>
						<div className='col'><span className='blue'></span>Soir uniquement</div>
						<div className='col'><span className='grey'></span>Fermer</div>
					</div>
					<ul className='days-display'>
						{days && days.map(day =>
							DaysFormat(day, onSetUpdateModal)
						)}
					</ul>
					<table>
						<tbody>
							{openHours && openHours.map(hour =>
								<tr key={hour.id}>
									<td>{hour.type === 'noon' ? 'Midi' : 'Soir'}</td>
									<td>{TimeFormat(hour.open)}</td>
									<td>/</td>
									<td>{TimeFormat(hour.close)}</td>
									<td><button onClick={() => onSetUpdateModal('hours', hour.id)}>Modifier</button></td>
								</tr>
							)}
						</tbody>
					</table>
					<button onClick={() => onSetAddModal('hour')}>Ajouter</button>
				</div>
			</section>
			{addModal === 'dish' ? <AddDishModal setAddModal={onSetAddModal} update={getResourses} /> : null}
			{addModal === 'menu' ? <AddMenuModal setAddModal={onSetAddModal} update={getResourses} /> : null}
			{addModal === 'hour' ? <AddHourModal setAddModal={onSetAddModal} update={getResourses} /> : null}
			{updateModal === 'dish' ? <UpdateDishModal setUpdateModal={onSetUpdateModal} id={idUpdate} update={getResourses} /> : null}
			{updateModal === 'menu' ? <UpdateMenuModal setUpdateModal={onSetUpdateModal} id={idUpdate} update={getResourses} /> : null}
			{updateModal === 'days' ? <UpdateDaysModal setUpdateModal={onSetUpdateModal} id={idUpdate} update={getResourses} /> : null}
			{updateModal === 'hours' ? <UpdateHoursModal setUpdateModal={onSetUpdateModal} id={idUpdate} update={getResourses} /> : null}
		</div>
	)
}
