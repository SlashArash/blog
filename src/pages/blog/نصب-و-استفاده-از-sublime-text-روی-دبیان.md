---
title: "نصب و استفاده از Sublime Text روی دبیان"
templateKey: blog-post
date: 2016-02-07T15:04:10.000Z
draft: false
keywords:
  - نصب sublime text
description: Brewing with a Chemex probably seems like a complicated, time-consuming ordeal, but once you get used to the process, it becomes a soothing ritual that's worth the effort every time.
tags:
  - آموزش
  - لینوکس
---

Sublime Text رو خیلی دوست دارم. کارکردن باهاش خیلی راحته. هیچ چیزی گیر و یا پیچیده نیست. از همون اول اینجوریه نه با تنظیمات و سر و کله زدن.

اولین بار که اومد از sublime text روی دبیان استفاده کنم برام سخت بود، یعنی تازه بود روش نصب وگرنه اونقدرها هم وقت گیر یا سخت نیست.

تنها مشکل سابلایم تکست اینه که منبع‌باز نیست، ولی خوب دبیان که هست. sublime text توی مخازن اکثر توزیع‌های لینوکسی وجود نداره و مجبور به نصب دستی اون هستیم مراحل کامل اون رو در این نوشته توضیح دادم.

**گام اول:** فایل فشرده‌ش رو از [سایت سابلایم](http://www.sublimetext.com/2) دانلود می‌کنیم بعد هم با دستور زیر اکسترکتش می‌کنیم. توجه کنید که فایل شما ممکنه اسمش فرق کنه پس دقت کنید.

 

 tar xf Sublime\\ Text\\ 2.0.2\\ x64.tar.bz2

 

**گام دوم:** بعد از اکسترکت یه پوشه‌ای به اسم «Sublime Text 2» دارید که تموم فایلهای مورد نیاز داخل اونه. اینجا می‌خواهیم این پوشه رو توی یک جای مناسب داشته باشیم. توی ساختار پوشه بندی لنوکس یه پوشه برای این کار درست شده به اسم «opt» با دستور زیر اون رو به پوشه مورد نظر جابجا می‌کنیم.

 sudo mv Sublime\\ Text\\ 2 /opt/

 

**گام سوم:** اگر بخواهید از توی ترمینال سابلایم رو باز کنید مثلا**ً** بنویسید sublime و اونوقت برنامه باز بشه، باید یک سیمبلیک لینک توی پوشه user/bin/ بسازیم. این کار رو الان انجام می‌دیم.

 sudo ln -s /opt/Sublime\\ Text\\ 2/sublime\_text /usr/bin/sublime

 

**گام چهارم:** الان برنامه توی جای درستی قرار داره. الان وقت اینه که آیکون توی لانچر ایجاد کنیم، پس یک فایل توی پوشه /usr/share/applications میسازیم.

 sudo sublime /usr/share/applications/sublime.desktop

 

توی فایلی که توسط خود سابلایم باز شد کدهای زیر را کپی می‌کنیم.

\[Desktop Entry\]
Version=1.0
Name=Sublime Text 2
GenericName=Text Editor

Exec=sublime
Terminal=false
Icon=/opt/Sublime Text 2/Icon/48x48/sublime\_text.png
Type=Application
Categories=TextEditor;IDE;Development
X-Ayatana-Desktop-Shortcuts=NewWindow

\[NewWindow Shortcut Group\]
Name=New Window
Exec=sublime -n
TargetEnvironment=KDE

می‌بینید که این کدها خیلی ساده‌ست و پس یه نگاه بهش بندازید و اگه لازم دونستین تغییرش بدید ;)

**گام پنجم:** اگر دوست داشتید که همه‌ی برنامه‌ها تون به صورت پیش‌فرض با سابلایم باز بشه می‌تونید فایل زیر را باز کنید و هرجا gedit.desktop بود با sublime.desktop عوض کنید.

 sudo sublime /usr/share/applications/defaults.list

 

**گام ششم:** اگر از نوم(گنوم) استفاده ‌می‌کنید احتمالاً موقع راست کلیک کردن متوجه خواهید شد که برای باز کردن فایلی با سابلایم اسم اون در لیست برنامه‌ها نیست! برای اینکه به راست کلیک اضافه بشه باید منو رو نصب کنیم.

 sudo apt-get install menu

 

بعدش یه فایل مخفی توی پوشه خانه‌(home) ایجاد کنیم به صورت زیر.

 ~/.menu/subl

و کدهای زیر را داخل اون پیست کنید.

?package(sublime-text):needs="X11"\\
section="Applications/Editors"\\
hints="Text editor"\\
longtitle="Sublime Text 3"\\
title="Sublime"\\
command="/usr/bin/subl"

و بعد از اون هم منو رو آپدیت کنید.

 sudo update-menus -v --menufilesdir=~/.menu
