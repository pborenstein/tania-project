# Tania Project

Worklog for the Tania Project

Plan:

- turn the JPGs into a single PDF
- use PDFPenPro to OCR the Cyrillic
- get the Cyrillic text into a UTF-8 text file
- use Google Translate to translate that file into
  whatever Google can translate to

[The Raw History File](#the-raw-history-file) is a log
of what I've done (with narrative!).


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**On this page**

- [Tania Project](#tania-project)
  - [what is](#what-is)
    - [`./`](#)
    - [`librotiataniaruso/`](#librotiataniaruso)
    - [`taniapieces/`](#taniapieces)
    - [`russian.pdf`](#russianpdf)
  - [tools](#tools)
    - [mutools](#mutools)
  - [The Raw History File](#the-raw-history-file)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->




## what is

### `./`


Files.

-   `README.md`<br>
    This.
-   `librotiataniaruso.zip`<br>
    Source for above. From Isidoro's email.
-   `package-lock.json`<br>
    Node droppings.
-   `package.json`<br>
    Node droppings.
-   `russian-single-page.pdf`<br>
    `russian.pdf` as single pages instead of spreads.
-   `russian.pdf`<br>
    The pictures of spreads in `librotiataniaruso/`
    combined into a PDF file.
-   `tania.txt`<br>
    Raw Cyrillic text made like so:
      -   OCR Cyrillic with PDFPenPro.
      -   Select all.
      -   Copy
      -   `$ pbpaste > tania.txt`


Directories.

-   `dist/`<br>
    Eleventy output directory.
    Ignored in repo.
-   `librotiataniaruso/`<br>
    Photos of pages. PDF work copies.
-   `node_modules/`<br>
    More like mode nodules, amiright?
-   `src/`<br>
    The Cyrillic text file.
-   `taniapieces/`<br>
    Early attempts at this task.





### `librotiataniaruso/`

Source material. Where the adventure begins.

-   `3.jpeg` .. `27.jpeg`<br>
    Photos of n spreads of book by Nahum Baskin printed in Russian
-   `out.pdf`<br>
    combined jpegs into one pdf made with img2pdf:s

    ```
    # fish-shell
    $ img2pdf (seq 3 27).jpeg -o out.pdf
    $ cp out.jpg ../russian.pdf
    ```

-   `split.pdf`<br>
    Instead of spreads, cuts `out.pdf` down the middle

    ```
    $ mutool poster -x 2 out.pdf split.pdf
    $ cp split.pdf ../russian-single-page.pdf
    ```

-   `split-split.pdf`<br>
    some shenanigans in the output of mutool
    where in PDFPenPro pages appeared blank
    though they looked fine in Preview

    Probably had to open / save as… or some such

### `taniapieces/`

Early attempts at batch translation.
Split the files into chunks.
tried to use [translate-shell](https://github.com/soimort/translate-shell)
to do big batch translation.
Translate-shell just hits the Google API
and they don't really like you doing this kind of thing.

```
# fish-shell
$ split -l 300 tania.txt
$ for f in x*
    mv $f $f.txt
  end
```

Then submitting each `xa-.txt` to translate.google.com.

```
pbpaste > 01.txtpbpaste > 02.txt
pbpaste > 03.txt
pbpaste > 04X.txt
pbpaste > 04.txt
head 04*
pbpaste > 05X.txt
pbpaste > 05.txt
pbpaste > 06.txt
mv 04X.txt zz04.txt
mv 05X.txt zz05.txt
cat 0*.txt
cat 0*.txt | wc
cat 0*.txt | bbedit
```

I think the last became `rawtranslation.txt`.

The less we say about this, the better.


### `russian.pdf`


## tools

The tools they used.

-   `imagemagick`
-   `img2pdf`
-   `mutools`

### mutools

```
$ tar xvzf mupdf-1.17.0-source.tar.gz
$ cd mupdf-1.17.0-source/
$ more README
$ make HAVE_X11=no HAVE_GLUT=no prefix=/usr/local install
```




## The Raw History File

Entries in chronological order
from the first thing I did
to the last, but not including
writing this README.

I start by installing Imagemagick:

```
brew install imagemagick
```

But everyone says img2pdf is better,
but it's not in homebrew :(

```
brew search img2pdf
```

So I got to the img2pdf site,
see that I'm going to have to use
pip3. Do I have what it takes?
Yes I do.

```
pip
pip3 --version

```

Let's build it. Code from Github (and its kin)
goes in the `~/gh/` directory. That K? It's a
[special k](https://github.com/gsamokovarov/jump).


```
k gh
git clone http://gitlab.mister-muffin.de/josch/img2pdf.git
cd img2pdf/
pip3 install .
img2pdf --version
img2pdf --help
```

Yay img2pdf is in play.

Seeing if I can be clever in specifying the
JPGs for img2pdf to use.

```
k is
...
cd Desktop/
seq 3 27
seq 3 27.jpeg
seq --help
seq 3 27 -s ff
seq -s ff 3 27
seq -s 'ff ' 3 27
echo (seq 3 27)
echo (seq 3 27).jpeg
open .
```

Looks like I looked for a CLI translator
and found translate-shell.
I did not read the instructions.

```
brew search translate
brew home translate-shell
brew install translate-shell
translate-shell
ls /usr/local/Cellar/translate-shell/0.9.6.12
ls /usr/local/Cellar/translate-shell/0.9.6.12/bin/
```

I have no idea where `tania.txt` came from.
It was not created at the command line.

I'm guessing that I opened one of the
JPGs in PDFPenPro, OCRed it, and
pasted it into `tania.txt`. Probably.

```
head tania.txt
head tania.txt > test.txt
```

Lets take translate-shell (their friends
call them trans) for a spin.

```
trans file://test.txt
more test.txt
bbedit test.txt
trans -i test.txt
trans -i tania.txt
trans file://tania.txt
trans --dump  file://test.txt
```

Something's not working. Maybe read the instructions?

```
trans --help | bbedit
trans --help
```

Somewhere around here Google starts throttling us.
I thought it might be that we were making too many
requests in a short time. But now that I think
about it, maybe the Cyrillic was a flag too.

``` sh
trans --dump -E apertium  file://test.txt
man trans
trans --dump -e apertium  file://test.txt
trans -S
trans --dump -e bing  file://test.txt
trans -e bing  file://test.txt -o output.txt
more output.txt
trans -e bing  file://tania.txt -o output.txt
tail -f output.txt
bbedit output.txt
pbpaste > 300.txt
more 300.txt
tail 300.txt
wc 300.txt
```

I don't know what 300.txt means.
Maybe the first 300 lines?

Anyway, here's where I decide to split
the text into chunks.

```sh
split --help
mkdir taniapieces
cp tania.txt taniapieces/
cd taniapieces/
split tania.txt
split tania.txt foo
```

After reading the instructions
I get it right.

```sh
man split
split -l 300 tania.txt
```

```
rm foo*
seq a f
seq 'a' 'f'
seq
man seq
echo xa{a-f}
echo {a,b,v}foo
echo {a-f}ff
echo {a..f}
echo {a..f}d
echo {a .. f}d
echo {a,b,c}foo {a,b,c}foo.txt
```

Stopped trying to be clever.


```sh
for f in x*
    echo $f
  end
for f in x*
    echo $f $f.txt
  end
for f in x*
    mv $f $f.txt
  end
```

This is the shameful attempt to use
the web interface to Google Translate
and pasting the results like a savage.

```
pbpaste > 01.txt
pbpaste > 02.txt
pbpaste > 03.txt
pbpaste > 04X.txt
pbpaste > 04.txt
head 04*
pbpaste > 05X.txt
pbpaste > 05.txt
pbpaste > 06.txt
mv 04X.txt zz04.txt
mv 05X.txt zz05.txt
cat 0*.txt
cat 0*.txt | wc
cat 0*.txt | bbedit
```

And this, reader, is where I got serious.
Let's make a project. Again, it's a special k.

```
k project
mkdir tania-project
cd tania-project/
git init .
git ignore-io -t
git ignore-io -l
git ignore-io node
git ignore-io -a node
git ignore-io
git ignore-io - macos
git ignore-io -s macos
git ignore-io -r macos node
more .gitignore
git ignore-io -s eleventy
git ignore-io -s 11
git ci -am ignore
history
history | bbedit
mv ~/Desktop/librotiataniaruso.zip .
mv ~/Desktop/librotiataniaruso/ .
mv ~/Desktop/taniapieces/ .
mv ~/Desktop/tania.txt .
mv ~/Desktop/out.pdf russian.pdf
vim README.md
more tania.txt
git mv taniapieces/tania.txt russian.md
git add -A
more russian.md
mkdir src
cd
```

Whew! It's hard to create a new
Eleventy project from scratch.
Luckily I have this nifty
minimal-11ty repo.

```
k /Users/philip/projects
more minimal-11ty/
cd minimal-11ty/
more package.json
cp package.json ../tania-project/
k tania-project
git add package.json
npm search eleventy
git add package-lock.json
ls -a
cp ../minimal-11ty/.eleventy.js
cp ../minimal-11ty/.eleventy.js .
ls _site/
git mv russian.md  src/
http-server _site/
../tania-project/
git ignore _site/
git add .eleventy.js
open russian.pdf
npm upgrade
npm upgrade dependency-graph entities
```

Y'know, it should be easier to set up
a template project.
Because grrr.

```
rm -rf node_modules/
npm install
npm outdated
bbedit .eleventy.js
npm install @11ty/eleventy
npx eleventy
git ci -am wip
vim .eleventy.js
rm -rf _site/
more .eleventy.js
```

Everything works now.

```
npx eleventy --serve
pbpaste > .fish_dir_title
vim .fish_dir_title
```

Here I'm correcting the Cyrillic text
against the images in the PDF.
You can tell because I typed
`git st` and it came out
as `гит ст`. (Russian Phonetic keyboard.)
Some Git shenanigans.
Like one day I'm going to get
my stuff done without troubleshooting
some tool that stopped working
all the sudden.


```
гит ст
git ci
git config --get commit.template
more ~/.gitconfig
vim ~/.gitconfig
git ci -a
git tag --help
git tag weird-thing
```

Everything is going well, until I hit
a line that doesn't match. In fact
nothing matches after line 865
(now marked with `****` in `russian.md`)

```
commit 2ff493f33330167fdc06a9fa139e5f1dd38284e2 (tag: weird-thing)
Author: Philip Borenstein <pborenstein@gmail.com>
Date:   Tue Aug 11 00:08:07 2020 -0400

    Something weird in our OCR copy

    up until line 865 the text tracks with the
    image in the PDF. Then it doesn't

    WTF
```

Turns out that Select All / Copy works
as long as the OCR scans down one page
of a spread and then down the other.
And that's exactly what happened unti
around the middle of page 22 when the
OCR started scanning across the spread
instead.

So I tagged the state.


```
git ci -am 'before reprocessing'
which img2webp
more /usr/local/bin/img2webp
man img2pdf
img2pdf --help | bbedit
ls taniapieces/
```

So we start again.

```
cd librotiataniaruso/
img2pdf (seq 3 27).jpeg -o out.pdf
open out.pdf
img2pdf -C L (seq 3 27).jpeg -o outgray.pdf
open outgray.pdf
convert 10.jpeg -negate -threshold 100 -negate result.jpg
rm result.jpg outgray.pdf
convert 10.jpeg -lat 25x25+10%  result.jpg
open result.jpg
```

This is where I learn about mutool,
which had to be built from source.

```
brew search mutool
cd ~/Desktop/mutools/
tar xvzf mupdf-1.17.0-source.tar.gz
cd mupdf-1.17.0-source/
more README
make HAVE_X11=no HAVE_GLUT=no prefix=/usr/local install
mutool --help
mutool poster
```

The poster subcommand slices up PDFs.
This command means:

Split each page along the x-axis
into two sides.

```
mutool poster -x 2 out.pdf split.pdf
ls ..
cp split.pdf ../russian-single-page.pdf
open thing.pdf
rm thing.pdf
open split.pdf
mutool convert
ll
git diff
git ci -am 'something changed but I dont know exactly what'
git st
git add ../russian-single-page.pdf
..
ls
bbedit .
history merge
```
