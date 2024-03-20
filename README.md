<h1>Начало</h1>
<h2>прописать команды:</h2>
<p>>git clone https://github.com/Tribekk/rest-api</p>
<p>> cd rest-api</p>
<p>>composer install</p>
<p>>npm install</p>
<p>измените .env.example на .env</p>
<p>>Php artisan key:generate</p>
<p>>php artisan migrate</p>
<p>>npm run dev</p>
<p>>php artisan serve</p>
rest-api построен на laravel V10 метод index показ всех досок(использует сортировку по дате обновления), метод store добавление доски (использует свой реквест в котором прописаны ограничения на создание имени),метод show показ одной доски(id получаю из модели доски), метод update именение доски, destroy удаление доски.