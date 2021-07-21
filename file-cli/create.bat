@Echo Off
SetLocal EnableDelayedExpansion
::被复制的源文件夹
set sourceDir=demo
::目标文件夹
set tarDir=..\src\views\%1\
xcopy %sourceDir% %tarDir% /s/-y
chcp 65001
cd %tarDir%
Set File=template.vue
Set Str=templateCLassName
Set Replace=%1
For /F "Usebackq Delims=" %%i In (`"findstr /n ^^ template.vue"`) Do (
  setlocal enabledelayedexpansion
  set Line=%%i
  set Line=!Line:%Str%=%~1%!
  Set Line=!Line:*:=!
  (echo.!Line!)>>index.vue
  endlocal
)
del template.vue