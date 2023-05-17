import { FC } from 'react';
import Card from './Card';
import axios from 'axios';
import { productType } from '@/types';

type Props = {
    cardList: productType[];
};

const Hero: FC<Props> = ({ cardList }) => {
    return (
        <section className="hero">
            <div className="container">
                <div className="hero_content">
                    <div>
                        <h1 className="hero__title">
                            Get started with Gscore today!
                        </h1>
                    </div>

                    <div className="hero__cards-flex">
                        {cardList &&
                            cardList.map((card) => (
                                <Card key={card.id} card={card} />
                            ))}
                    </div>

                    <div className="hero__footer">
                        <span className="hero__footer-text">
                            Have more than 10 sites?
                        </span>
                        <a href="#" className="hero__footer-link">
                            Contact us
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
