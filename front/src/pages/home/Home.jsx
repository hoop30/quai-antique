import React from 'react'
import restaurant from '../../assets/img/quai-antique.jpg'

export default function Home() {

    return (
        <>
            <header className='home-header'>
                <div className="img-container">
                    <img src={restaurant} alt="Restaurant" />
                </div>
                <div className="h1-title">
                    <h1>Le Quai Antique</h1>
                </div>
            </header>
            <main className='home-main'>
                <article className='description'>
                    <p>
                        Le Quai Antique est un restaurant situé à Chambéry, dirigé par Arnaud Michant, un passionné de produits et producteur en Savoie.
                    </p>
                    <p>
                        L'ambiance intime et chaleureuse, avec une vue imprenable sur le lac du Bourget. La cuisine du Quai Antique vous propose une expérience gastronomique unique,
                    </p>
                    <p>
                        faite de produits de qualité et locaux, mis en valeur pour offrir une expérience culinaire inoubliable. Les plats simples mais savoureux et sans artifice sont régulièrement

                    </p>
                    <p>
                        mis à jour selon la saison et les produits disponibles. La carte des vins propose des références variées et locales. Le Quai Antique est une excellente adresse pour

                    </p>
                    <p>
                        découvrir des saveurs authentiques et variées, issues des produits et terroirs de la Savoie. Venez profiter de cette expérience culinaire unique,

                    </p>
                    <p>
                        à proximité du centre historique de Chambéry.

                    </p>
                </article>
                <article className='cta'>
                    <p>
                        Venez découvrir la gastronomie savoyarde authentique, dans un cadre intime et chaleureux, au Quai Antique. Réservez votre table et profitez d'une expérience culinaire unique !
                    </p>
                    <button>
                        <h2>Réservez</h2>
                    </button>
                </article>
            </main>
        </>
    )
}
