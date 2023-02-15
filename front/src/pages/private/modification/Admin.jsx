import React, { useEffect, useState } from 'react'
import AddDishModal from '../../../components/AddDishModal'
import AddHourModal from '../../../components/AddHourModal'
import AddMenuModal from '../../../components/AddMenuModal'
import GetDays from '../../../libs/days/GetDays'
import GetDish from '../../../libs/dish/GetDish'
import GetMenu from '../../../libs/menu/GetMenu'
import GetOpenHours from '../../../libs/openHours/GetOpenHours'
import DaysFormat from '../../../utils/DaysFormat'
import { FormatPrice } from '../../../utils/PriceFormat'
import TimeFormat from '../../../utils/TimeFormat'

export default function Admin() {

	const [dishs, setDishs] = useState()
	const [menus, setMenu] = useState()
	const [days, setDays] = useState()
	const [openHours, setOpenHours] = useState()
	const [addModal, setAddModal] = useState(null)

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
							DaysFormat(day)
						)}
					</ul>
					<table>
						<tbody>
							{openHours && openHours.map(hour =>
								<tr key={hour.id}>
									<td>{hour.type === 'noon' ? 'Midi' : 'Soir'}</td>
									<td>{TimeFormat(hour.open)}</td>
									/
									<td>{TimeFormat(hour.close)}</td>
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
		</div>
	)
}
