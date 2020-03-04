import Link from 'next/link';
import Layout from '../components/MyLayout';
import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';
import { useRouter } from 'next/router';

// const Index = props => (
//     <Layout>
//         <h1>Batman TV Shows</h1>
//         <ul>
//             {props.shows.map(show => (
//                 <li key={show.id}>
//                     <Link href="/p/[id]" as={`/p/${show.id}`}>
//                         <a>{show.name}</a>
//                     </Link>
//                 </li>
//             ))}
//         </ul>
//     </Layout>
// );
//
// Index.getInitialProps = async function() {
//     const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
//     const data = await res.json();
//
//     console.log(`Show data fetched. Count: ${data.length}`);
//
//     return {
//         shows: data.map(entry => entry.show)
//     };
// };
//
// export default Index;

function fetcher(url) {
    return fetch(url).then(r => r.json());
}

export default function Index() {
    const { query } = useRouter();
    const {data, error} = useSWR(`/api/randomQuote${query.author ? '?author=' + query.author : ''}`, fetcher);
    const author = data?.author;
    let quote = data?.quote;

    if (!data) quote = 'Looading...';
    if(error) quote = 'Failed to fetch the quote.';

    return(
        <main className='center'>
            <div className='quote'>
                {quote}
            </div>
            {author && <span className='author'>- {author}</span>}

            <style jsx>{`
              main {
                  width: 90%;
                  max-width: 900px;
                  margin: 300px auto;
                  text-align: center;
                }
                .quote {
                  font-family: cursive;
                  color: #e243de;
                  font-size: 24px;
                  padding-bottom: 10px;
                }
                .author {
                  font-family: sans-serif;
                  color: #559834;
                  font-size: 20px;
                }
            `}
            </style>
        </main>
    )
}