const wrapPub = async (event) => {
    console.log(event);
    return {
        statusCode: 200,
        body: "yo"
    };
};


module.exports = {
    wrapPub
}