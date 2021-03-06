# Lesson 2: Что такое JavaScript

Основа js — язык ECMAScript.
* Это встраиваемый, расширяемый, не имеющий средств ввода-вывода (т.е. не может писать и читать файлы).
* Стандартизирован международной организацией ECMA в спецификации ECMA-262.

Другие версии (стандарты) ECMAScript:
* es3
* es5.1
* strict mode
* ECMAScript 2015 (es6)
* es7 ?

JavaScript — динамический, слабо типизированный, интерпретируемый язык программирования.

* **Интерпретируемый:**
У js отсутствует стадия компиляции, как у языков, подобных Java или C. Код непосредственно передается в интерпретатор, который его выполняет по мере чтения.

* **Динамический:**
В отличие от статических языков, проверка типов в js происходит в момент выполнения кода.

* **Слабо типизированный:**
```js
$ node
> 3 + '8ha'
'38ha'
> '8ha' * 3
NaN
> true + 1
2
```

# Lesson 3: npm

Ключевая задача NPM - управление зависимостями (их обновление, установка и удаление).

Терминология:
* Пакет (Package) — библиотека, которую мы пишем или используем в проекте как зависимость.
* Репозиторий (Registry) — хранилище пакетов npm.
* Считается, что проект, в отличие от пакета, это конечный продукт, который никуда не публикуется. Но с точки зрения npm разницы между проектом и пакетом нет.

# Lesson 4: Обновление зависимостей. Lock file.

То, как будет происходить обновление, зависит от того, что написано в package.json.

Рассмотрим все доступные варианты:

```js
dependencies {
  'package1': "*",
  'package2': "1.3.5",
  'package3': "~2.3.4",
  'package4': "^2.3.4",
}
```
* `*` - означает, что можно ставить любую версию библиотеки
* `~` - фиксируется минорная версия библиотеки
* `^` - фиксируется мажорная версия библиотеки

# Lesson 5: Scripts

Понятие **"Переменные окружения"**:

Существует некая системная переменная PATH, внутри которой содержатся пути, по которым shell находит исполняемый файл, который вы пытаетесь запустить:
```
➜ ✗ echo $PATH | tr ":" "\n"
usr/bin
/bin
...
```
При **глобальной установке** пакета NPM берет бинарники из пакета и помещает по одному из путей указанных в PATH.

При **локальной установке** пакета они ставятся в локальную папку `node_modules`.
* Для вызова придется явно прописывать путь: `./node_modules/sloc/bin/sloc.js`
* Чтобы не приходилось явно прописывать путь к пакету для вызова программы и существует секция `scripts`.

### npx:
https://github.com/zkat/npx запуск программ, установленных локально

### Hooks:
Есть целый набор предопределенных свойств в Scripts, которые NPM запускает автоматически в разные моменты жизни.
Подробнее: https://docs.npmjs.com/misc/scripts

# Lesson 6: Babel

Babel — программа, которая берет указанный код и возвращает тот же код, но транслированный в старую версию JS.

Online REPL: https://babeljs.io/repl/


Babel состоит из многих частей:
* `babel-core` - выполняет всю работу по трансляции, но не содержит внутри себя правил преобразования
* Правила описаны в отдельных пакетах, называемых плагинами (например, `babel-plugin-transform-constant-string`).

**Настройка:**
* Файл `.babelrc` в корне проекта


**Использование:**

Чтобы иметь возможность вызывать babel, установленный как зависимость проекта, его надо добавить в секцию `scripts` файла `package.json`.

```
"scripts": {
  "babel": "babel"
}
```

Теперь можно его запустить так:
```
$ npm run babel -- src --out-dir dist
```

# Lesson 7: Source Map
Трансляция не дается бесплатно. Получившийся код нечитаем и его невозможно нормально отладить. Ведь теперь запускается не наш первоначальный код, а транслированный. Это значит, что любая логическая ошибка нашего кода будет указывать на транслированный код, который в свою очередь очень сильно отличается от исходного

Для решения этой проблемы используется специальный механизм под названием "source map" или "маппинг". Его принцип действия следующий. При транспайлинге кода создается структура определенного формата, в которой описана связь сгенерированного кода с исходным кодом. Затем эта структура записывается либо в отдельный, либо прямо в сгенерированный файл в виде комментария (inline mode). Затем, во время выполнения программы, она используется интерпретатором для построения правильных стектрейсов и ссылок.

Babel поддерживает source map из коробки. Для его генерации достаточно добавить флаг --source-maps в процесс компиляции:
```js
$ npx babel script.js --out-file script-compiled.js --source-maps --inline
```

После выполнения этой команды в конце транслированных файлов появится source map в виде комментария. Теперь, если запустить транслированный код, то вывод ошибки укажет на исходные файлы.

# Lesson 8: Точка входа

Самое интересное происходит при импорте сторонних npm-пакетов: `import lodash from 'lodash';`
Дело в том, что пакет — не то же самое что и модуль. Модуль — один файл, а пакет — набор файлов, в которые входят модули и `package.json`. Посмотрите содержимое репозитория `lodash`. В корне проекта находится, наверное, сотня файлов.

Возникает закономерный вопрос. Если внутри одного пакета множество модулей, то что же импортируется если мы пишем `import lodash from 'lodash'`?
В npm принято соглашение, что по умолчанию всегда импортируется файл index.js, находящийся в корне проекта. Этот файл является точкой входа в пакет. Все остальные модули, как правило, собираются внутри index.js. Но это поведение можно изменить. За это отвечает свойство main (главный) в файле package.json. Посмотрите его значение в пакете lodash. В нашем эталонном пакете nodejs-package эта строчка выглядит так:
```
"main": "dist/index.js"
```
Сам файл `dist/index.js` в репозитории отсутствует, как впрочем и папка `dist`. Как вы помните из урока про `babel`, эта директория формируется только в момент публикации пакета и заливается в `npm`, но в репозиторий ее не добавляют.
