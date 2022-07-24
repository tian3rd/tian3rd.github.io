# Welcome to My Blog

> Head over to [tian3rd.github.io](https://tian3rd.github.io) to check it out!

## About `jekyll`

### About `ruby`

If the `ruby` version is too old, on Mac OS you can use `brew` to install it. (use `which ruby` to check it out)

```bash
brew install ruby
```

and add the path to `ruby` at the very beginning of the `$PATH`, e.g., first check out the current path in your shell:

```bash
echo $PATH
```

Then add the path to homebrew installed `ruby` before the `/usr/local/bin` `ruby`:

```bash
# fish shell
fish_add_path /opt/homebrew/opt/ruby/bin
```

```bash
# bash shell
export PATH=/opt/homebrew/opt/ruby/bin:$PATH
```

Then check out the correct version of `ruby`: `which -a ruby` to see the `brew` path is before the `/usr/bin/ruby` path.

### Debug locally

Refer to the `jekyll` [documentation](https://jekyllrb.com/docs/) for more information.

```bash
# instal jekyll and bundler gems
gem install jekyll bundler
# in the blog directory
bundle exec jekyll serve
```
