// Native fetch is available in Node.js 18+

async function testApi() {
    const url = 'https://api.doorstephub.com/v1/dhubApi/app/applience-repairs-website/services_by_subcategory';
    const body = {
        lattitude: '17.4391296',
        longitude: '78.4433152',
        subcategoryId: '684d3bd136f6bb554bb77cc0'
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        if (data.dhubServices && data.dhubServices.length > 0) {
            const s = data.dhubServices[0];
            console.log('Sample Service:');
            console.log('name:', s.name);
            console.log('serviceName:', s.serviceName);
            console.log('_id:', s._id);
            console.log('mainImage:', s.mainImage);
        } else {
            console.log('No services found in response');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

testApi();
