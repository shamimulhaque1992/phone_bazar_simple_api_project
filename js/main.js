const searchphone = () => {
  //display spinner while loading
  toggleSpinner('block', 'none')
  //selecting the required elements
  const searchfeald = document.getElementById('search-feald');
  searchvalue = searchfeald.value;
  const phoneBasicscontainer = document.getElementById('product-basic-info')
  const totalphonecontainer = document.getElementById('totalphon')
  // totalphonecontainer.style.display = 'none'

  //selecting the required error elements
  const errorMessageinv = document.getElementById('error-message-inv')
  errorMessageinv.style.display = 'none'
  const errorMessagenull = document.getElementById('error-message-null')
  // totalphonecontainer.style.display = 'none'

  //checking wherher the input value is empty or not
  if (searchvalue == '') {
    console.log('msd');
    errorMessagenull.style.display = 'block'
    phoneBasicscontainer.style.display = 'none'
    totalphonecontainer.style.display = 'none'
  } else {
    phoneBasicscontainer.style.display = 'block'
    totalphonecontainer.style.display = 'block'
    errorMessagenull.style.display = 'none'
    console.log(searchvalue);
    //loading the api
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchvalue}`
    console.log(url);

    fetch(url)
      .then(response => response.json())
      .then(data => displayserachresult(data.data))

    searchfeald.value = '';
  }

}


//addding Spinner
const toggleSpinner = (displayPropsp, displaypropsc) => {
  document.getElementById('spinner').style.display = displayPropsp;
  document.getElementById('btnspinner').style.display = displayPropsp;
  document.getElementById('btnsearch').style.display = displaypropsc;
}

// display the JSON value in ui
const displayserachresult = (phones) => {
  console.log(typeof (phones));
  const totalphonecontainer = document.getElementById('totalphon')
  const phonecontainer = document.getElementById('phonecontainer')
  phonecontainer.innerHTML = '';
  const phoneBasicscontainer = document.getElementById('product-basic-info')
  phoneBasicscontainer.innerHTML = '';
  console.log(phones);
  const errorMessagenull = document.getElementById('error-message-null')
  errorMessagenull.style.display = 'none'
  const errorMessageinv = document.getElementById('error-message-inv')
  errorMessageinv.style.display = 'none'
  //checking wherher the input value is in the array or not
  if (phones.length == 0) {
    console.log('dsf');
    phoneBasicscontainer.style.display = 'none'
    totalphonecontainer.style.display = 'none'
    errorMessageinv.style.display = 'block'
  } else {
    // totalphonecontainer.style.display='block'
    errorMessageinv.style.display = 'none'
    phones.slice(0, 20).forEach((phone) => {
      console.log(phone);
      const div = document.createElement('div')
      div.classList.add('col')
      //creating the element for search results
      div.innerHTML = `
        <div class="card mx-auto border border-3" style="width: 15rem">
              <img src="${phone.image}" class="card-img-top p-3" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">
                  ${phone.brand}
                </p>
                <a class="mx-auto btn btn-primary" href="#top" onclick="loadDetails('${phone.slug}')">Explore More</a>
              </div>
        </div>
        `
      phonecontainer.appendChild(div)
    })
    toggleSpinner('none', 'block')
  }

}

//loading the phoner details from the details api
const loadDetails = (slug) => {
  toggleSpinner('block', 'none')
  console.log(slug);
  const url = ` https://openapi.programming-hero.com/api/phone/${slug}`
  console.log(url);

  fetch(url)
    .then(response => response.json())
    .then(data => displayDetails(data))
}


//displaying the details of the phones in ui
const displayDetails = (details) => {
  console.log(details.data.brand);
  const phoneBasicscontainer = document.getElementById('product-basic-info')
  phoneBasicscontainer.style.display = 'block'
  phoneBasicscontainer.innerHTML = '';

  console.log(details.data.image);
  const mainFeatures = details.data.mainFeatures.sensors;

  console.log(mainFeatures);
  const div = document.createElement('div')
  div.classList.add('col')
  // creating the ditails information of the certain phone
  div.innerHTML = `
        <div class="card text-center mx-auto" style="width: 86%">
            <div class="card-header">
              <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                  <a id="showBAsicinfo" class="nav-link active" aria-current="true" href="#"
                    >Basic info</a
                  >
                </li>
                <li class="nav-item">
                  <a id="showDetailsinfo" class="nav-link" href="#">Details info</a>
                </li>
                <li class="nav-item">
                  <a id="showAbout"
                    class="nav-link"
                    href="#"
                    >About ${details.data.brand}</a
                  >
                </li>
              </ul>
            </div>
            <img src="${details.data.image}" class="card-img-top w-50 mx-auto p-3" alt="..." />
            <div id='basicinfo' class="card-body">
              <h5 class="card-title">${details.data.name}</h5>
              <p id="relesedate" class="card-text fw-bold">
                ${details.data.releaseDate}
              </p>

              <div id="basicinfoPhone" class="border border-2 rounded-3 shadow-md">
                <table
                id="detailsinfo"
                class="table table-striped table-hover border border-1"
                >
                    <thead>
                    <tr>
                        <th scope="col">Sensores</th>
                        <th scope="col">Status</th>
                    </tr>
                    </thead>
                    <tbody id="tbody">
                    
                    </tbody>
                </table>
            </div>
            <div id="detailsinfoPhone" class="border border-2 rounded-3 shadow-md"  style="display: none">
              <table
              id="detailsinfo"
              class="table table-striped table-hover border border-1"
              >
                  <thead>
                  <tr>
                      <th scope="col">Features</th>
                      <th scope="col">Details</th>
                  </tr>
                  </thead>
                  <tbody id="tbody-details">
                  
                  </tbody>
              </table>
            </div>
            
              <p id="stock" class="card-text bg-info text-black fw-bold rounded-3">
              ${details.status}
              </p>
              
              <a href="#" class="btn btn-primary">Buy Now</a>
            </div>

            
          </div>
      
        `
  console.log(details);


  phoneBasicscontainer.appendChild(div)


  if (details.status == true) {
    document.getElementById('stock').innerText = 'In Stock';
  }else{
    document.getElementById('stock').innerText = 'Out of Stock';
  }
  if (details.data.releaseDate == '') {
    document.getElementById('relesedate').innerText = 'Relese Date: Sorry no date found!';
  }else{
    document.getElementById('relesedate').innerText = `Relese Date: ${details.data.releaseDate}`;
  }

  const productDetails = document.getElementById('tbody')
  //getting the sensore data one by one
  mainFeatures.forEach(feature => {
    const table_data = document.createElement('tr')
    console.log(feature.indexOf(feature));
    // table_data.classList.add('table-secondary')
    //creating the table data for sensores
    table_data.innerHTML = `
            <td class="table-secondary">${feature}</td>
            <td class="table-primary"><i class="fa fa-check"></i></td>
            
        `
    productDetails.appendChild(table_data)
  })

  const productDetailsinfo = document.getElementById('tbody-details')
  const detailFeatures = details.data.mainFeatures;
  console.log(detailFeatures.chipSet);
  //getting the sensore data one by one
  Object.keys(detailFeatures).forEach(data => {
    const table_data = document.createElement('tr')
    // console.log(feature.indexOf(feature));
    // table_data.classList.add('table-secondary')
    //creating the table data for sensores
    table_data.innerHTML = `
            <td class="table-secondary w-50">${data}</td>
            <td class="table-primary w-50">${detailFeatures[data]}</td>
        `
    productDetailsinfo.appendChild(table_data)
  })
toggleSpinner('none', 'block')


  document.getElementById('showDetailsinfo').addEventListener('click', () => {
    basicinfoPhone.style.display = 'none'
    detailsinfoPhone.style.display = 'block'
  })
  document.getElementById('showBAsicinfo').addEventListener('click', () => {
    basicinfoPhone.style.display = 'block'
    detailsinfoPhone.style.display = 'none'
  })
  document.getElementById('showAbout').addEventListener('click', () => {
    window.open(`http://${details.data.brand}.com`);
  })

}
