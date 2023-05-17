import Hero from '@/components/screens/hero/Hero';
import { GetStaticProps, NextPage } from 'next';
import { productType } from '@/types';
import { ProductService } from '@/services/product.service';

type getStaticPropsType = {
    cardList: productType[];
};

type homePropsType = {
    cardList: productType[];
};

export const getStaticProps: GetStaticProps<getStaticPropsType> = async () => {
    const cardList = await ProductService.getAll();

    return {
        props: { cardList },
        revalidate: 60,
    };
};

const Home: NextPage<homePropsType> = ({ cardList }) => {
    return <Hero cardList={cardList} />;
};
export default Home;
