import { user } from './user_information';

//gönderen hesabi sectirdigimiz alanın icerigini degistirebilmek icin o alani seciyoruz
const accordion = document.querySelector('#accountArea');

let balance = 100;

//hesap bilgileri adedi kadar accordion elemanini yukarida sectigimiz alana ekliyoruz
user.accounts.map((account) => {
  accordion.innerHTML += `
  <div class="accordion-item">
          <h2 class="accordion-header" id="heading-${account.id}">
            <button id="accordion-button-${account.id}" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${account.id}" aria-expanded="false" aria-controls="collapse-${account.id}">
              ${account.name}<div class="account-balance" id="account-balance-${account.id}">${account.balance}</div><div>₺</div>
            </button>
          </h2>
          <div id="collapse-${account.id}" class="accordion-collapse collapse" aria-labelledby="heading-${account.id}" data-bs-parent="#accountArea">
            <div class="accordion-body">
              ${account.iban}
            </div>
          </div>
        </div>
`;
});

//bootstrap stillendirmelerini dogru yapabilmek icin sadece ilk elemanin butonunun attribute ve class degerlerini ayarliyoruz
const accordionBtn = document.querySelector('#accordion-button-1');
accordionBtn.attributes[5].value = 'true';
accordionBtn.classList.remove('collapsed');

//ilk elemanın default olarak acik olmasi icin class listesine show class'ini ekliyoruz
const collapseItem = document.querySelector('#collapse-1');
collapseItem.classList.add('show');

//iban ve miktar inputlariyla islem yapabilmek icin en basta secimlerimizi yapiyoruz
const inputIban = document.querySelector('#inputIban');
const inputAmount = document.querySelector('#inputAmount');

//acik olan hesabin id'sini alabilmek icin
//show class'i olan elemani seciyoruz. bu class sadece acik olan hesapta oluyor. hesap penceresi kapaninca show class adi siliniyor
const openedItem = document.querySelector('.show');
//show class adina sahip olan div'in id'si collapse-1 geliyor. bunu split fonksiyonu ile ayirip son eleman olan 1 degerini aliyoruz
const openedItemSplit = openedItem.id.split('-');
const openedItemId = openedItemSplit[openedItemSplit.length - 1];

//her hesabin bakiyesinin bulundugu div id'si account-balance-1 gibi oldugu icin acik olarak gelen kismi bu sekilde seciyoruz
let openedAccountBalance = document.querySelector(
  `#account-balance-${openedItemId}`
);

//iban girdigimiz alana her sayi girisinde calisacak fonksiyonu yaziyoruz
inputIban.addEventListener('input', () => {
  //TR'de iban uzunlukları 24 oldugu icin iban alanına girilen deger 24 karaktere ulastiginda miktar girilecek alanın disabled ozelligini kaldiriyoruz
  if (inputIban.value.length == 24) {
    inputAmount.removeAttribute('disabled');
  } else {
    //eger girilen deger 24'den buyuk olursa yine disabled ozelligi ekliyor ve miktar girisine izin vermiyoruz
    inputAmount.setAttribute('disabled', '');
    //ayrica bu alani temizliyoruz
    inputAmount.value = '';
  }
});

let typedAmount = 0;

const sendBtn = document.querySelector('#sendBtn');
const modalBody = document.querySelector('.modal-body');
const form = document.querySelector('#form');
const modeTitle = document.querySelector('#exampleModalLabel');
const sendModalBtn = document.querySelector('#sendModalBtn');

console.log(openedAccountBalance);

function success() {
  sendModalBtn.classList.add('none');
  modalBody.innerHTML = 'Paracıklar yolda 💸';
  inputIban.value = '';
  inputAmount.value = '';
  inputAmount.setAttribute('disabled', '');
  sendBtn.classList.add('disabled');
  openedAccountBalance.textContent =
    openedAccountBalance.textContent - typedAmount;
  balance = balance - typedAmount;
}

sendBtn.addEventListener('click', (event) => {
  event.preventDefault();

  if (typedAmount < 500) {
    success();
  } else {
    modeTitle.textContent = 'Son bir şey daha ';
    form.classList.remove('form-none');
  }
});

const codeInput = document.querySelector('#recipient-name');
let denemeHakki = 4;

const fieldSet = document.querySelector('fieldset');

sendModalBtn.addEventListener('click', (event) => {
  if (codeInput.value == 1234) {
    success();
  } else {
    denemeHakki--;
    modeTitle.textContent = `Hatalı Şifre! ${denemeHakki} deneme hakkınız kaldı!`;
    codeInput.value = '';
    if (denemeHakki == 0) {
      modeTitle.textContent = 'Üzgünüz';
      modalBody.innerHTML = 'Hesabınız blokelendi';
      fieldSet.setAttribute('disabled', '');
      clearInterval(setInt);
      sendModalBtn.classList.add('disabled');
    }
  }
});

inputAmount.addEventListener('input', (event) => {
  typedAmount = event.target.value;
  console.log(balance);
  if (typedAmount && balance >= typedAmount) {
    sendBtn.classList.remove('disabled');
  } else {
    sendBtn.classList.add('disabled');
  }
});

const calc = (event) => {
  const wholeId = event.target.id.split('-');
  const id = wholeId[wholeId.length - 1];
  const balanceTag = document.querySelector(`#account-balance-${id}`);
  balance = parseInt(balanceTag.textContent);
  openedAccountBalance = balanceTag;
};

const btn = document.querySelectorAll('.accordion-button');

btn.forEach((item) => {
  item.addEventListener('click', calc);
});

const countDownLabel = document.querySelector('#countdown');

let setInt = setInterval(() => {
  countDownLabel.textContent = countDownLabel.textContent - 1;
  if (countDownLabel.textContent == 0) {
    fieldSet.setAttribute('disabled', '');
    clearInterval(setInt);
  }
}, 1000);
