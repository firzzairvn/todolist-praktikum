let toDoInput; // Variabel untuk menyimpan elemen input untuk menambahkan tugas
let errorInfo; // Variabel untuk menyimpan elemen untuk menampilkan informasi kesalahan
let addBtn; // Variabel untuk menyimpan elemen tombol 'Tambah' pada tampilan
let ulList; // Variabel untuk menyimpan elemen daftar tugas (unordered list)
let newToDo; // Variabel untuk menyimpan nilai dari tugas baru yang dimasukkan

let popup; // Variabel untuk menyimpan elemen pop-up
let popupInfo; // Variabel untuk menyimpan elemen informasi pada pop-up
let todoToEdit; // Variabel untuk menyimpan tugas yang akan diedit pada pop-up
let popupInput; // Variabel untuk menyimpan elemen input pada pop-up
let popupAddBtn; // Variabel untuk menyimpan elemen tombol 'Tambah' pada pop-up
let popupCloseBtn; // Variabel untuk menyimpan elemen tombol 'Tutup' pada pop-up

const main = () => {
    //
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {
    // Memilih elemen input untuk menambahkan tugas berdasarkan kelas '.todo-input'
    toDoInput = document.querySelector('.todo-input');
    
    // Memilih elemen untuk menampilkan informasi kesalahan berdasarkan kelas '.error-info'
    errorInfo = document.querySelector('.error-info');
    
    // Memilih elemen tombol 'Tambah' pada tampilan berdasarkan kelas '.btn-add'
    addBtn = document.querySelector('.btn-add');
    
    // Memilih elemen daftar tugas (unordered list) berdasarkan kelas '.todolist ul'
    ulList = document.querySelector('.todolist ul');

    // Memilih elemen pop-up berdasarkan kelas '.popup'
    popup = document.querySelector('.popup');
    
    // Memilih elemen informasi pada pop-up berdasarkan kelas '.popup-info'
    popupInfo = document.querySelector('.popup-info');
    
    // Memilih elemen input pada pop-up berdasarkan kelas '.popup-input'
    popupInput = document.querySelector('.popup-input');
    
    // Memilih elemen tombol 'Tambah' pada pop-up berdasarkan kelas '.accept'
    popupAddBtn = document.querySelector('.accept');
    
    // Memilih elemen tombol 'Tutup' pada pop-up berdasarkan kelas '.cancel'
    popupCloseBtn = document.querySelector('.cancel');
}

const prepareDOMEvents = () => {
    // Menambahkan event listener pada tombol 'Tambah' untuk menambah tugas baru saat diklik
    addBtn.addEventListener('click', addNewToDo);
    
    // Menambahkan event listener pada daftar tugas untuk mengecek klik pada daftar tugas
    ulList.addEventListener('click', checkClick);
    
    // Menambahkan event listener pada tombol 'Tutup' pada pop-up untuk menutup pop-up saat diklik
    popupCloseBtn.addEventListener('click', closePopup);
    
    // Menambahkan event listener pada tombol 'Tambah' pada pop-up untuk mengubah teks tugas saat diklik
    popupAddBtn.addEventListener('click', changeTodoText);
    
    // Menambahkan event listener pada input tugas untuk memeriksa tombol yang ditekan
    toDoInput.addEventListener('keyup', enterKeyCheck);
}

const addNewToDo = () => {
    // Memeriksa apakah nilai dari input tidak kosong
    if (toDoInput.value != ''){
        // Membuat elemen <li> baru untuk tugas
        newToDo = document.createElement('li');
        newToDo.textContent = toDoInput.value;
        
        // Memanggil fungsi untuk membuat area alat (tools) untuk tugas
        createToolArea();
        
        // Menambahkan tugas baru ke dalam daftar (unordered list)
        ulList.append(newToDo);
        
        // Mengosongkan nilai input setelah tugas ditambahkan
        toDoInput.value = '';
        
        // Mengosongkan pesan kesalahan (error message)
        errorInfo.textContent = '';
    } else {
        // Menampilkan pesan kesalahan jika input kosong saat mencoba menambah tugas baru
        errorInfo.textContent = 'Error!';
    }
}

const createToolArea = () => {
    // Membuat sebuah div untuk menampung tombol-tombol aksi (tools)
    const div = document.createElement('div');
    div.classList.add('tools');
    
    // Meletakkan div sebagai bagian dari tugas yang baru dibuat
    newToDo.append(div);

    // Membuat tombol untuk menandai tugas sebagai selesai
    const buttonDone = document.createElement('button');
    buttonDone.classList.add('complete');
    buttonDone.innerHTML = '<i class="fas fa-check"></i>'

    // Membuat tombol untuk mengedit tugas
    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('edit');
    buttonEdit.textContent = 'EDIT';

    // Membuat tombol untuk menghapus tugas
    const buttonCancel = document.createElement('button');
    buttonCancel.classList.add('delete');
    buttonCancel.innerHTML = '<i class="fas fa-times"></i>'

    // Menambahkan tombol-tombol aksi ke dalam div tools
    div.append(buttonDone, buttonEdit, buttonCancel);
}

const checkClick = (e) => {
    if(e.target.matches('.complete')){
        // Mengubah status tugas menjadi 'completed' saat tombol 'complete' diklik
        e.target.closest('li').classList.toggle('completed'); 
        e.target.classList.toggle('completed');

    } else if (e.target.matches('.edit')) {
        // Memanggil fungsi untuk mengedit tugas saat tombol 'edit' diklik
        editToDo(e);

    } else if (e.target.matches('.delete')) {
        // Memanggil fungsi untuk menghapus tugas saat tombol 'delete' diklik
        deleteToDo(e);

    }
}

const editToDo = (e) => { 
    // Menyimpan tugas yang akan diedit dalam variabel 'todoToEdit'
    todoToEdit = e.target.closest('li'); 
    // Mengatur nilai input pada pop-up sesuai dengan teks tugas yang akan diedit
    popupInput.value = todoToEdit.firstChild.textContent; 
    // Menampilkan pop-up
    popup.style.display = 'flex';
}

const closePopup = () => {
    // Menyembunyikan pop-up
    popup.style.display = 'none';
    // Mengosongkan pesan informasi pada pop-up
    popupInfo.textContent = '';
}

const changeTodoText = () => {
    if (popupInput.value != '') {
        // Mengubah teks tugas sesuai dengan nilai pada input pop-up
        todoToEdit.firstChild.textContent = popupInput.value;
        // Menyembunyikan pop-up
        popup.style.display = 'none';
        // Mengosongkan pesan informasi pada pop-up
        popupInfo.textContent = '';
    } else {
        // Menampilkan pesan kesalahan jika input pada pop-up kosong saat mencoba mengubah tugas
        popupInfo.textContent = 'Add Something Here';
    }
}

const deleteToDo = (e) => {
    // Menghapus tugas yang sesuai dengan tombol 'delete' yang diklik
    e.target.closest('li').remove(); 

    // Memeriksa apakah tidak ada lagi tugas yang tersisa setelah dihapus
    const allToDos = ulList.querySelectorAll('li');
    if (allToDos.length == 0) {
        // Menampilkan pesan informasi jika tidak ada tugas yang tersisa setelah dihapus
        errorInfo.textContent = 'You dont have any task, please add some'
    }
}

const enterKeyCheck = (e) => {
    if(e.key == 'Enter'){
        // Menambahkan tugas baru saat tombol 'Enter' ditekan
        addNewToDo();
    }
}

// Fungsi yang dipanggil ketika konten DOM telah dimuat
document.addEventListener('DOMContentLoaded', main);
