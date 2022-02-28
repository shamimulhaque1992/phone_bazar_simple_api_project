const searchphone = () => {
    const searchfeald = document.getElementById('search-feald');
    searchvalue = searchfeald.value;
    if (searchvalue % 1 == 0) {
        console.log('give input value')
    } else {
        console.log(searchvalue);
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchvalue}`
        console.log(url);

        fetch(url)
            .then(response => response.json())
            .then(data => displayserachresult(data.data))

        searchfeald.value = '';
    }

}

const displayserachresult = (phones) => {
    const phonecontainer = document.getElementById('phonecontainer')
    phonecontainer.innerHTML = '';
    const phoneBasicscontainer = document.getElementById('product-basic-info')
    phoneBasicscontainer.innerHTML = '';
    console.log(phones);
    phones.forEach((phone) => {
        console.log(phone);
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card mx-auto border border-3" style="width: 15rem">
              <img src="${phone.image}" class="card-img-top p-3" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">
                  ${phone.brand}
                </p>
                <button class="mx-auto btn btn-primary" onclick="loadDetails('${phone.slug}')">Explore More</button>
              </div>
        </div>
        `
        phonecontainer.appendChild(div)
    })
}

const loadDetails = (slug) => {
    console.log(slug);
    const url = ` https://openapi.programming-hero.com/api/phone/${slug}`
    console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(data => displayDetails(data))
}

const displayDetails = (details) => {
    console.log(details.data.mainFeatures.sensors);
    const phoneBasicscontainer = document.getElementById('product-basic-info')
    phoneBasicscontainer.innerHTML = '';

    console.log(details.data.image);
    const mainFeatures = details.data.mainFeatures.sensors;

    console.log(mainFeatures);
    const div = document.createElement('div')
    div.classList.add('col')
    div.innerHTML = `
        <div class="card text-center mx-auto" style="width: 86%">
            <div class="card-header">
              <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="true" href="#"
                    >Basic info</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Details info</a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    >About us</a
                  >
                </li>
              </ul>
            </div>
            <img src="${details.data.image}" class="card-img-top w-50 mx-auto p-3" alt="..." />
            <div id='basicinfo' class="card-body">
              <h5 class="card-title">${details.data.name}</h5>
              <p class="card-text">
                ${details.data.releaseDate}
              </p>
            <table
            id="detailsinfo"
            class="table table-striped table-hover border border-1"
            >
                <thead>
                <tr>
                    <th scope="col">Features</th>
                    <th scope="col">Status</th>
                </tr>
                </thead>
                <tbody id="tbody">
                
                </tbody>
            </table>
              <p class="card-text">
              ${details.status}
              </p>
              
              <a href="#" class="btn btn-primary">Buy Now</a>
            </div>

            
          </div>
      
        `

    phoneBasicscontainer.appendChild(div)

    const productDetails = document.getElementById('tbody')
    mainFeatures.forEach(feature => {
        const table_data = document.createElement('tr')
        console.log(feature.indexOf(feature));
        // table_data.classList.add('table-secondary')
        table_data.innerHTML = `
            <td class="table-secondary">${feature}</td>
            <td class="table-primary"><i class="fa fa-check"></i></td>
            
        `
        productDetails.appendChild(table_data)
    })
}
