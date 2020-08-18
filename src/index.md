---
layout: layouts/base.njk
---

# {{ config.siteName }}


- <a style="font-weight:bold" class="head" href="/about">What is this?</a><br>
  This is the memoir of Tania Mostkoff,
  daughter of Israel and Shifra Mostkoff

<ul>
    {%-for post in collections.posts -%}
      <li><a href={{post.url}}>{{post.data.title}}</a><br>
      {{post.data.description}}<br><br></li>
    {%- endfor -%}

    <li><a href="/assets/split.pdf">Scanned PDF</a></li>
</ul>


