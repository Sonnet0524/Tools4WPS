---
title: Document Content Extraction
breadcrumb: WPS365应用开发 > 云文档 > 文件（夹） > 文档内容抽取
source: raw_md/app-integration-dev/wps365/server/yundoc/file/get-file-content.md
---


# 文档内容抽取



**标签**：`文件` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/drives/{drive_id}/files/{file_id}/content          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `GET`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 文档内容抽取 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>查询和管理文件(应用授权) `kso.file.readwrite`</div><div style="margin-top: 5px;"></div><div>查询文件(应用授权) `kso.file.read`</div><div style="margin-top: 5px;"></div><div>查询和管理文件(用户授权) `kso.file.readwrite`</div><div style="margin-top: 5px;"></div><div>查询文件(用户授权) `kso.file.read`</div><div style="margin-top: 5px;"></div><div>MCP云文档管理(用户授权) `kso.mcp_yundoc.readwrite`</div><div style="margin-top: 5px;"></div><div>MCP智能文档管理(用户授权) `kso.mcp_airpage.readwrite`</div></div> |




## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">drive_id</div> | `string` | 是 |  | - 
| <div style="white-space: nowrap;">file_id</div> | `string` | 是 |  | - 



## 查询参数 (Query)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">format</div> | `string` | 否 | 文档内容目标格式 | `kdc`, `plain`, `markdown`, `html` 
| <div style="white-space: nowrap;">include_elements</div> | `array` | 否 | 指定抽取元素。默认元素为para，且一定会被导出；其余附加元素根据请求参数选择性导出。 | `para`, `table`, `component`, `textbox`, `all` 
| <div style="white-space: nowrap;">mode</div> | `string` | 否 | 接口模式。sync-同步模式，默认；async-异步模式，启用该模式后，内容抽取转为异步处理；auto-自动模式，启用该模式后，耗时较长的内容抽取任务将自动转为异步处理。 | `sync`, `async`, `auto` 
| <div style="white-space: nowrap;">task_id</div> | `string` | 否 | 异步任务id，用于内容抽取任务的结果查询，在mode=async/auto时生效。 | - 





## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>文档内容抽取信息响应体</p>\n","children":[{"key":"data.task_id","name":"task_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>任务id，在mode=async/auto时返回，仅保证接口异步化场景下的查询有效性。</p>\n","children":[]},{"key":"data.task_status","name":"task_status","deprecated":false,"type":"string","required":"否","enum":["success","running","failed"],"xEnum":["success","running","failed"],"description":"<p>任务状态，在mode=async/auto时返回。</p>\n","children":[]},{"key":"data.attachment_url","name":"attachment_url","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>附件下载地址</p>\n","children":[]},{"key":"data.doc","name":"doc","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>文字类的结构化数据，源格式为’otl’、'pdf’和’docx’并且目标格式为’kdc’时适用，《KDC规范》：<a href=\"https://365.kdocs.cn/l/caW2QBdM4bjJ\">https://365.kdocs.cn/l/caW2QBdM4bjJ</a></p>\n","children":[{"key":"data.doc.comments","name":"comments","deprecated":false,"type":"array[object]","required":"否","enum":[],"xEnum":[],"description":"<p>批注</p>\n","children":[{"key":"data.doc.comments.items.blocks","name":"blocks","deprecated":false,"type":"array[object]","required":"否","enum":[],"xEnum":[],"description":"<p>批注数据</p>\n","children":[{"key":"data.doc.comments.items.blocks.items.bounding_box","name":"bounding_box","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>当前块的外接矩形框的几何坐标</p>\n","children":[{"key":"data.doc.comments.items.blocks.items.bounding_box.x1","name":"x1","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>left-top 点 x坐标</p>\n","children":[]},{"key":"data.doc.comments.items.blocks.items.bounding_box.x2","name":"x2","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>right-bottom 点 x坐标</p>\n","children":[]},{"key":"data.doc.comments.items.blocks.items.bounding_box.y1","name":"y1","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>left-top 点 y坐标</p>\n","children":[]},{"key":"data.doc.comments.items.blocks.items.bounding_box.y2","name":"y2","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>right-bottom 点 y坐标</p>\n","children":[]}]},{"key":"data.doc.comments.items.blocks.items.component","name":"component","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>块类型为component时适用</p>\n","children":[{"key":"data.doc.comments.items.blocks.items.component.media_id","name":"media_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>媒体id</p>\n","children":[]},{"key":"data.doc.comments.items.blocks.items.component.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["image","audio","video"],"xEnum":["image","audio","video"],"description":"<p>component类型枚举</p>\n<ul>\n<li>image - 图片</li>\n<li>audio - 音频</li>\n<li>video - 视频</li>\n</ul>\n","children":[]}]},{"key":"data.doc.comments.items.blocks.items.id","name":"id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>块ID</p>\n","children":[]},{"key":"data.doc.comments.items.blocks.items.index","name":"index","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>当前块的索引</p>\n","children":[]},{"key":"data.doc.comments.items.blocks.items.page_index","name":"page_index","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>当前块所在的页索引，从0开始</p>\n","children":[]},{"key":"data.doc.comments.items.blocks.items.para","name":"para","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>块类型为para时适用</p>\n","children":[{"key":"data.doc.comments.items.blocks.items.para.prop","name":"prop","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>段属性</p>\n","children":[{"key":"data.doc.comments.items.blocks.items.para.prop.alignment","name":"alignment","deprecated":false,"type":"string","required":"否","enum":["left","center","right","justify","distribute"],"xEnum":["left","center","right","justify","distribute"],"description":"<p>段落对齐方式</p>\n","children":[]},{"key":"data.doc.comments.items.blocks.items.para.prop.def_run_prop","name":"def_run_prop","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>默认句属性</p>\n","children":[{"key":"data.doc.comments.items.blocks.items.para.prop.def_run_prop.bold","name":"bold","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>粗体, 默认false</p>\n","children":[]},{"key":"data.doc.comments.items.blocks.items.para.prop.def_run_prop.color","name":"color","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>颜色， RGBA 16进制描述，例如：#FF0000FF; 最后两位为透明度</p>\n","children":[]},{"key":"data.doc.comments.items.blocks.items.para.prop.def_run_prop.font_ascii","name":"font_ascii","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>西文字体名</p>\n","children":[]},{"key":"data.doc.comments.items.blocks.items.para.prop.def_run_prop.font_east_asia","name":"font_east_asia","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>东亚字体名</p>\n","children":[]},{"key":"data.doc.comments.items.blocks.items.para.prop.def_run_prop.size","name":"size","deprecated":false,"type":"number","required":"否","enum":[],"xEnum":[],"description":"<p>大小， 单位磅</p>\n","children":[]}]},{"key":"data.doc.comments.items.blocks.items.para.prop.list_string","name":"list_string","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>段落上的项目编号字符串</p>\n","children":[]},{"key":"data.doc.comments.items.blocks.items.para.prop.outline_level","name":"outline_level","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>大纲级别, 1-9 表示级别1-级别9， 10表示正文。若段落在表格内，则忽略此属性</p>\n","children":[]}]},{"key":"data.doc.comments.items.blocks.items.para.runs","name":"runs","deprecated":false,"type":"array[object]","required":"是","enum":[],"xEnum":[],"description":"<p>句列表</p>\n","children":[{"key":"data.doc.comments.items.blocks.items.para.runs.items.id","name":"id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>句 ID</p>\n","children":[]},{"key":"data.doc.comments.items.blocks.items.para.runs.items.prop","name":"prop","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>句属性</p>\n","children":[{"key":"data.doc.comments.items.blocks.items.para.runs.items.prop.bold","name":"bold","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>粗体, 默认false</p>\n","children":[]},{"key":"data.doc.comments.items.blocks.items.para.runs.items.prop.color","name":"color","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>颜色， RGBA 16进制描述，例如：#FF0000FF; 最后两位为透明度</p>\n","children":[]},{"key":"data.doc.comments.items.blocks.items.para.runs.items.prop.font_ascii","name":"font_ascii","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>西文字体名</p>\n","children":[]},{"key":"data.doc.comments.items.blocks.items.para.runs.items.prop.font_east_asia","name":"font_east_asia","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>东亚字体名</p>\n","children":[]},{"key":"data.doc.comments.items.blocks.items.para.runs.items.prop.size","name":"size","deprecated":false,"type":"number","required":"否","enum":[],"xEnum":[],"description":"<p>大小， 单位磅</p>\n","children":[]}]},{"key":"data.doc.comments.items.blocks.items.para.runs.items.text","name":"text","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>文本内容</p>\n","children":[]}]}]},{"key":"data.doc.comments.items.blocks.items.rotate","name":"rotate","deprecated":false,"type":"number","required":"否","enum":[],"xEnum":[],"description":"<p>当前块的旋转角度</p>\n","children":[]},{"key":"data.doc.comments.items.blocks.items.table","name":"table","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>块类型为table时适用</p>\n","children":[{"key":"data.doc.comments.items.blocks.items.table.rows","name":"rows","deprecated":false,"type":"array[object]","required":"否","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.doc.comments.items.blocks.items.table.rows.items.cells","name":"cells","deprecated":false,"type":"array[object]","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.doc.comments.items.blocks.items.table.rows.items.cells.items.blocks","name":"blocks","deprecated":false,"type":"array[object]","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"data.doc.comments.items.blocks.items.table.rows.items.cells.items.col_span","name":"col_span","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>水平方向（向右）合并的单元格数量</p>\n","children":[]},{"key":"data.doc.comments.items.blocks.items.table.rows.items.cells.items.id","name":"id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>单元格 ID</p>\n","children":[]},{"key":"data.doc.comments.items.blocks.items.table.rows.items.cells.items.row_span","name":"row_span","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>垂直方向（向下）合并的单元格数量</p>\n","children":[]}]}]}]},{"key":"data.doc.comments.items.blocks.items.tags","name":"tags","deprecated":false,"type":"array[object]","required":"否","enum":[],"xEnum":[],"description":"<p>tag列表</p>\n","children":[{"key":"data.doc.comments.items.blocks.items.tags.items.name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>名称</p>\n","children":[]},{"key":"data.doc.comments.items.blocks.items.tags.items.value","name":"value","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>值</p>\n","children":[]}]},{"key":"data.doc.comments.items.blocks.items.textbox","name":"textbox","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>块类型为textbox时适用</p>\n","children":[{"key":"data.doc.comments.items.blocks.items.textbox.blocks","name":"blocks","deprecated":false,"type":"array[object]","required":"是","enum":[],"xEnum":[],"description":"<p>文本框的内的块内容</p>\n","children":[]}]},{"key":"data.doc.comments.items.blocks.items.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["para","table","textbox","component"],"xEnum":["para","table","textbox","component"],"description":"<p>块类型枚举</p>\n<ul>\n<li>para - 段落</li>\n<li>table - 表格</li>\n<li>textbox - 文本框</li>\n<li>component - 部件（图片、音视频、脑图、流程图等）</li>\n</ul>\n","children":[]}]},{"key":"data.doc.comments.items.references","name":"references","deprecated":false,"type":"array[object]","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.doc.comments.items.references.items.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"data.doc.comments.items.references.items.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["run","block","cell"],"xEnum":["run","block","cell"],"description":"<p>ID 类型</p>\n","children":[]}]}]},{"key":"data.doc.medias","name":"medias","deprecated":false,"type":"array[object]","required":"否","enum":[],"xEnum":[],"description":"<p>媒体文件</p>\n","children":[{"key":"data.doc.medias.items.data","name":"data","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>媒体数据，base64形式。 data和url两者选一</p>\n","children":[]},{"key":"data.doc.medias.items.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"data.doc.medias.items.url","name":"url","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>媒体数据，url链接形式，数据存放在外部,  data和url两者选一</p>\n","children":[]}]},{"key":"data.doc.prop","name":"prop","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>文档的属性和元数据</p>\n","children":[{"key":"data.doc.prop.page_count","name":"page_count","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>文档总页数</p>\n","children":[]},{"key":"data.doc.prop.page_props","name":"page_props","deprecated":false,"type":"array[object]","required":"否","enum":[],"xEnum":[],"description":"<p>文档所有页的基本信息</p>\n","children":[{"key":"data.doc.prop.page_props.items.dpi","name":"dpi","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>图像场景中，KDC结果中坐标、页大小、字号等物理单位到像素单位的dpi</p>\n","children":[]},{"key":"data.doc.prop.page_props.items.offset_angle","name":"offset_angle","deprecated":false,"type":"number","required":"否","enum":[],"xEnum":[],"description":"<p>扫描件的旋转小角度</p>\n","children":[]},{"key":"data.doc.prop.page_props.items.rotate","name":"rotate","deprecated":false,"type":"integer","required":"否","enum":[0,90,180,270],"xEnum":["rotate0","rotate90","rotate180","rotate270"],"description":"<p>页面与内容的旋转角度枚举，90度的正整数倍</p>\n","children":[]},{"key":"data.doc.prop.page_props.items.size","name":"size","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>页大小，单位磅</p>\n","children":[{"key":"data.doc.prop.page_props.items.size.height","name":"height","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>高度</p>\n","children":[]},{"key":"data.doc.prop.page_props.items.size.width","name":"width","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>宽度</p>\n","children":[]}]}]}]},{"key":"data.doc.tree","name":"tree","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>文档数据树状结构表示，以大纲级别为层级</p>\n","children":[{"key":"data.doc.tree.blocks","name":"blocks","deprecated":false,"type":"array[object]","required":"是","enum":[],"xEnum":[],"description":"<p>块，存储具体内容</p>\n","children":[]},{"key":"data.doc.tree.children","name":"children","deprecated":false,"type":"array[object]","required":"是","enum":[],"xEnum":[],"description":"<p>子节点</p>\n","children":[]},{"key":"data.doc.tree.outline_level","name":"outline_level","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>大纲级别, 1-9 表示级别1-级别9， 10表示正文，同段落属性中的大纲级别</p>\n","children":[]}]}]},{"key":"data.doc_url","name":"doc_url","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>对象存储的下载地址（url过期时间由业务方传入，不传默认1小时）</p>\n","children":[]},{"key":"data.dst_format","name":"dst_format","deprecated":false,"type":"string","required":"是","enum":["kdc","plain","markdown","html"],"xEnum":["kdc","plain","markdown","html"],"description":"<p>目标格式</p>\n<ul>\n<li>kdc - 结构化表示</li>\n<li>plain - 纯文本</li>\n<li>markdown - markdown</li>\n</ul>\n","children":[]},{"key":"data.file_info","name":"file_info","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>文档的元信息</p>\n","children":[{"key":"data.file_info.is_scan","name":"is_scan","deprecated":false,"type":"boolean","required":"是","enum":[],"xEnum":[],"description":"<p>是否为扫描文档</p>\n","children":[]},{"key":"data.file_info.sheet_num","name":"sheet_num","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>表格文件sheet 数量</p>\n","children":[]},{"key":"data.file_info.total_page_num","name":"total_page_num","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>总页数，-1表示未知</p>\n","children":[]}]},{"key":"data.html","name":"html","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>导出格式为HTML时，返回的内容</p>\n","children":[]},{"key":"data.is_partly_exported","name":"is_partly_exported","deprecated":false,"type":"boolean","required":"是","enum":[],"xEnum":[],"description":"<p>是否部分导出</p>\n","children":[]},{"key":"data.markdown","name":"markdown","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>markdown内容数据，目标格式为’markdown’时适用</p>\n","children":[]},{"key":"data.plain","name":"plain","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>纯文本内容数据，目标格式为’plain’时适用</p>\n","children":[]},{"key":"data.src_format","name":"src_format","deprecated":false,"type":"string","required":"是","enum":["docx","doc","dot","wps","wpt","dotx","docm","dotm","rtf","uot","mht","mhtml","htm","html","xml","xls","xlt","et","ett","xlsx","xltx","csv","xlsm","xltm","xlsb","uos","ksheet","pptx","ppt","pot","potx","pps","ppsx","dps","dpt","pptm","potm","ppsm","uop","pdf","ofd","uof","jpg","jpeg","png","gif","bmp","tif","tiff","psd","svg","vsd","vsdx","txt","log","c","cpp","java","lrc","h","asm","s","asp","bat","bas","prg","cmd","cdr","epub","dbf","otl","dbt","mtm"],"xEnum":["docx","doc","dot","wps","wpt","dotx","docm","dotm","rtf","uot","mht","mhtml","htm","html","xml","xls","xlt","et","ett","xlsx","xltx","csv","xlsm","xltm","xlsb","uos","ksheet","pptx","ppt","pot","potx","pps","ppsx","dps","dpt","pptm","potm","ppsm","uop","pdf","ofd","uof","jpg","jpeg","png","gif","bmp","tif","tiff","psd","svg","vsd","vsdx","txt","log","c","cpp","java","lrc","h","asm","s","asp","bat","bas","prg","cmd","cdr","epub","dbf","otl","dbt","mtm"],"description":"<p>源格式</p>\n<ul>\n<li>otl - 智能文档</li>\n<li>pdf - pdf文档</li>\n<li>docx - 后缀为docx的word文档</li>\n</ul>\n","children":[]},{"key":"data.src_format_detail","name":"src_format_detail","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>源文件详细格式，如PDF-std</p>\n","children":[]},{"key":"data.version","name":"version","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>版本信息，详情请参考<a href=\"https://365.kdocs.cn/l/co69J6iPXTEs\">https://365.kdocs.cn/l/co69J6iPXTEs</a></p>\n","children":[]}]},{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]}]' />

## 响应体示例
```json
{
  "data": {
    "task_id": "string",
    "task_status": "success",
    "attachment_url": "string",
    "doc": {
      "comments": [
        {
          "blocks": [
            {
              "bounding_box": {
                "x1": 0,
                "x2": 0,
                "y1": 0,
                "y2": 0
              },
              "component": {
                "media_id": "string",
                "type": "image"
              },
              "id": "string",
              "index": 0,
              "page_index": 0,
              "para": {
                "prop": {
                  "alignment": "left",
                  "def_run_prop": {
                    "bold": true,
                    "color": "string",
                    "font_ascii": "string",
                    "font_east_asia": "string",
                    "size": 0
                  },
                  "list_string": "string",
                  "outline_level": 0
                },
                "runs": [
                  {
                    "id": "string",
                    "prop": {
                      "bold": true,
                      "color": "string",
                      "font_ascii": "string",
                      "font_east_asia": "string",
                      "size": 0
                    },
                    "text": "string"
                  }
                ]
              },
              "rotate": 0,
              "table": {
                "rows": [
                  {
                    "cells": [
                      {
                        "blocks": [
                          {}
                        ],
                        "col_span": 0,
                        "id": "string",
                        "row_span": 0
                      }
                    ]
                  }
                ]
              },
              "tags": [
                {
                  "name": "string",
                  "value": "string"
                }
              ],
              "textbox": {
                "blocks": [
                  {}
                ]
              },
              "type": "para"
            }
          ],
          "references": [
            {
              "id": "string",
              "type": "run"
            }
          ]
        }
      ],
      "medias": [
        {
          "data": "string",
          "id": "string",
          "url": "string"
        }
      ],
      "prop": {
        "page_count": 0,
        "page_props": [
          {
            "dpi": 0,
            "offset_angle": 0,
            "rotate": 0,
            "size": {
              "height": 0,
              "width": 0
            }
          }
        ]
      },
      "tree": {
        "blocks": [
          {}
        ],
        "children": [
          {}
        ],
        "outline_level": 0
      }
    },
    "doc_url": "string",
    "dst_format": "kdc",
    "file_info": {
      "is_scan": true,
      "sheet_num": 0,
      "total_page_num": 0
    },
    "html": "string",
    "is_partly_exported": true,
    "markdown": "string",
    "plain": "string",
    "src_format": "docx",
    "src_format_detail": "string",
    "version": "string"
  },
  "code": 0,
  "msg": "string"
}
```


