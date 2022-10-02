$(function () {
    $('#datepicker').datepicker({
        format: 'yyyy-mm-dd' 
    });
  });
let country = document.getElementById('country');
let getdata = document.getElementById('getdata');
let activecases = document.getElementById('activecases');
let newcases = document.getElementById('newcases');
let recoveredcases = document.getElementById('recoveredcases');
let totalcases = document.getElementById('totalcases');
let totaldeaths = document.getElementById('totaldeaths');
let totaltest = document.getElementById('totaltest');
let dates = document.getElementById('dates');
let countryname = '';
let date = '';
let exist = false;
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
    }
};

function show() {
    document.getElementById('loading').classList.remove('d-none');
    countryname = country.value;
    date = dates.value;

    fetch('https://covid-193.p.rapidapi.com/countries?search=' + countryname, options)
        .then(response => response.json())
        .then(response => {
            let data = response;
            if (data.response.length == 0) {
                exist = false;
            }
            else{
                exist = true;
            }
            if (exist) {
                fetch('https://covid-193.p.rapidapi.com/history?country=' + countryname + '&day=' + date, options)
                    .then(response => response.json())
                    .then(response => {
                        let data = response;
                        console.log(data);
                        activecases.innerHTML = data.response[0].cases.active;
                        newcases.innerHTML = data.response[0].cases.new;
                        recoveredcases.innerHTML = data.response[0].cases.recovered;
                        totalcases.innerHTML = data.response[0].cases.total;
                        totaldeaths.innerHTML = data.response[0].deaths.total;
                        totaltest.innerHTML = data.response[0].tests.total;
                        if (activecases.innerHTML === '') {
                            activecases.innerHTML = 'No Data';
                        }
                        if (newcases.innerHTML === '') {
                            newcases.innerHTML = 'No Data';
                        }
                        if (recoveredcases.innerHTML === '') {
                            recoveredcases.innerHTML = 'No Data';
                        }
                        if (totalcases.innerHTML === '') {
                            totalcases.innerHTML = 'No Data';
                        }
                        if (totaldeaths.innerHTML === '') {
                            totaldeaths.innerHTML = 'No Data';
                        }
                        if (totaltest.innerHTML === '') {
                            totaltest.innerHTML = 'No Data';
                        }
                        document.getElementById('loading').classList.add('d-none');
                    })
                    .catch(err => console.error(err));
            }else{
                document.getElementById('loading').classList.add('d-none');
                activecases.innerHTML = 0;
                newcases.innerHTML = 0;
                recoveredcases.innerHTML = 0;
                totalcases.innerHTML = 0;
                totaldeaths.innerHTML = 0;
                totaltest.innerHTML = 0;
                setTimeout(() => {
                    alert('The input country was not found!');
                }, 500);
            }
        })
        .catch(err => console.error(err));   
}