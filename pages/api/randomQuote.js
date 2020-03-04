import allQuotes from '../../quotes.json';

export default (req, res) => {
    // res.status(200).json({
    //     quote: 'Write tests, not too many, mostly integration',
    //     author: 'Guillermo Rauch'
    // })

    // Send random quote from array
    // const quote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
    // res.status(200).json(quote);

    // Filter
    const {author} = req.query;
    let quotes = allQuotes;

    if (author) {
        quotes = quotes.filter(quote => quote.author.toLowerCase().includes(author.toLowerCase()));
    }
    if(!quotes.length) {
        quotes = allQuotes.filter(quote => quote.author.toLowerCase() === 'unknown');
    }

    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    res.status(200).json(quote);
}