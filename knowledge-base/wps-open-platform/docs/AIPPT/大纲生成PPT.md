# 大纲生成PPT

    根据多级大纲一键生成ppt,sse流式接口，分多次返回单页ppt。

    

**标签**：`AIPPT` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/sse/aippt/generate_slides_from_pxf_v2          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `POST`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 根据多级大纲一键生成ppt,sse流式接口，分多次返回单页ppt。 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>AIPPT资源使用及生成(应用授权) `kso.aippt.readwrite`</div></div> |




## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"author_name","name":"author_name","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用于填充封面页 汇报者姓名</p>\n","children":[]},{"key":"gen_mode","name":"gen_mode","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>生成模式，0-AI模板生成PPT（默认），4-标准模板生成PPT</p>\n","children":[]},{"key":"md_outlines","name":"md_outlines","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>markdown大纲格式，传入符合规范的数据直接生成ppt，暂不支持保留图片</p>\n","children":[]},{"key":"multi_page_outlines","name":"multi_page_outlines","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>AIPPT大纲标准格式，可直接生成ppt的数据结构，支持图片插入</p>\n","children":[{"key":"multi_page_outlines.attachments","name":"attachments","deprecated":false,"type":"array[object]","required":"否","enum":[],"xEnum":[],"description":"<p>附件列表</p>\n","children":[{"key":"multi_page_outlines.attachments.items.attachment_format","name":"attachment_format","deprecated":false,"type":"string","required":"是","enum":["af_pic","af_kso_table_clip_bin","af_kso_table_clip_html","af_kso_chart_clip_bin","af_pptx"],"xEnum":["af_pic","af_kso_table_clip_bin","af_kso_table_clip_html","af_kso_chart_clip_bin","af_pptx"],"description":"<p>附件类型</p>\n","children":[]},{"key":"multi_page_outlines.attachments.items.attachment_id","name":"attachment_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>附件唯一ID</p>\n","children":[]},{"key":"multi_page_outlines.attachments.items.url","name":"url","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>附件URL</p>\n","children":[]}]},{"key":"multi_page_outlines.data_describe_type","name":"data_describe_type","deprecated":false,"type":"string","required":"是","enum":["dt_multi_page","dt_page","dt_diagram"],"xEnum":["dt_multi_page","dt_page","dt_diagram"],"description":"<p>数据描述类型</p>\n","children":[]},{"key":"multi_page_outlines.data_version","name":"data_version","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>数据格式版本号</p>\n","children":[]},{"key":"multi_page_outlines.doc_name","name":"doc_name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>文档名称</p>\n","children":[]},{"key":"multi_page_outlines.root_node","name":"root_node","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>根节点</p>\n","children":[{"key":"multi_page_outlines.root_node.children","name":"children","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>页面布局节点数组</p>\n","children":[{"key":"multi_page_outlines.root_node.children.attachment_id","name":"attachment_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>附件唯一ID</p>\n","children":[]},{"key":"multi_page_outlines.root_node.children.children","name":"children","deprecated":false,"type":"array[object]","required":"否","enum":[],"xEnum":[],"description":"<p>页面布局节点数组</p>\n","children":[]},{"key":"multi_page_outlines.root_node.children.diagram_type","name":"diagram_type","deprecated":false,"type":"string","required":"否","enum":["dt_seq","dt_stp","dt_cir","dt_pyr","dt_mat","dt_dis","dt_hie","dt_cst"],"xEnum":["dt_seq","dt_stp","dt_cir","dt_pyr","dt_mat","dt_dis","dt_hie","dt_cst"],"description":"<p>图示类型，仅在节点类型为nt_diagram时有效</p>\n","children":[]},{"key":"multi_page_outlines.root_node.children.node_type","name":"node_type","deprecated":false,"type":"string","required":"是","enum":["nt_multi_page","nt_page","nt_span","nt_diagram","nt_diagram_item","nt_title","nt_subtitle","nt_author","nt_date","nt_section_num","nt_text","nt_item_num","nt_numeric","nt_year","nt_company","nt_contact","nt_picture","nt_icon","nt_chart","nt_table"],"xEnum":["nt_multi_page","nt_page","nt_span","nt_diagram","nt_diagram_item","nt_title","nt_subtitle","nt_author","nt_date","nt_section_num","nt_text","nt_item_num","nt_numeric","nt_year","nt_company","nt_contact","nt_picture","nt_icon","nt_chart","nt_table"],"description":"<p>节点类型</p>\n","children":[]},{"key":"multi_page_outlines.root_node.children.text","name":"text","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>文本，在节点类型为文本类有效</p>\n","children":[]}]},{"key":"multi_page_outlines.root_node.node_type","name":"node_type","deprecated":false,"type":"string","required":"是","enum":["nt_multi_page","nt_page","nt_span","nt_diagram","nt_diagram_item","nt_title","nt_subtitle","nt_author","nt_date","nt_section_num","nt_text","nt_item_num","nt_numeric","nt_year","nt_company","nt_contact","nt_picture","nt_icon","nt_chart","nt_table"],"xEnum":["nt_multi_page","nt_page","nt_span","nt_diagram","nt_diagram_item","nt_title","nt_subtitle","nt_author","nt_date","nt_section_num","nt_text","nt_item_num","nt_numeric","nt_year","nt_company","nt_contact","nt_picture","nt_icon","nt_chart","nt_table"],"description":"<p>节点类型</p>\n","children":[]}]}]},{"key":"pptx_params","name":"pptx_params","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>PPT生成参数</p>\n","children":[{"key":"pptx_params.content_item_count","name":"content_item_count","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>标准模板目录项数，用来之后切分目录页；如果需要目录页切页，则为必传</p>\n","children":[]},{"key":"pptx_params.disable_gen_file","name":"disable_gen_file","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>控制不返回文件</p>\n","children":[]},{"key":"pptx_params.disable_gen_thumb","name":"disable_gen_thumb","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>控制不返回缩略图</p>\n","children":[]},{"key":"pptx_params.disable_generate_pic","name":"disable_generate_pic","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>控制不返回配图的PPT文件</p>\n","children":[]},{"key":"pptx_params.filter_slide_types","name":"filter_slide_types","deprecated":false,"type":"array[string]","required":"否","enum":[],"xEnum":[],"description":"<p>要过滤掉（不包含）的页面类型</p>\n","children":[]},{"key":"pptx_params.generate_index","name":"generate_index","deprecated":false,"type":"array[integer]","required":"否","enum":[],"xEnum":[],"description":"<p>控制生成指定的页码的幻灯片</p>\n","children":[]},{"key":"pptx_params.generate_language","name":"generate_language","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>生成中/英文PPT</p>\n","children":[]},{"key":"pptx_params.generate_picture_keyword","name":"generate_picture_keyword","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>AI文生图关键词</p>\n","children":[]},{"key":"pptx_params.generate_picture_mode","name":"generate_picture_mode","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>AI配图模式 0：仅图库 1：仅生图 2：图库+生图 使用开放能力的用户只支持生图模式</p>\n","children":[]},{"key":"pptx_params.merge_slides","name":"merge_slides","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>是否在生成所有单页后进行合并，返回一个完整PPTX文件；按传入值控制，如false，如20个单页url；如true，合为一份url承载整份PPT</p>\n","children":[]},{"key":"pptx_params.slides_count","name":"slides_count","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>控制生成前多少页幻灯片，-1生成所有页数</p>\n","children":[]},{"key":"pptx_params.standard_template_key","name":"standard_template_key","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>标准模板key(以标准模板的存储链接key值传递)。gen_mode为1时，为空</p>\n","children":[]}]},{"key":"pxf_root","name":"pxf_root","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>PPT大纲树结构（由文档/大纲文本/主题生成演示大纲接口返回），会在服务内部转化成AIPPT大纲标准格式再生成ppt，但无法支持保留图片插入</p>\n","children":[{"key":"pxf_root.data_describe_type","name":"data_describe_type","deprecated":false,"type":"string","required":"是","enum":["dt_multi_page","dt_page","dt_diagram"],"xEnum":["dt_multi_page","dt_page","dt_diagram"],"description":"<p>数据描述类型</p>\n","children":[]},{"key":"pxf_root.data_version","name":"data_version","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>数据格式版本号</p>\n","children":[]},{"key":"pxf_root.doc_name","name":"doc_name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>文档名称</p>\n","children":[]},{"key":"pxf_root.medias","name":"medias","deprecated":false,"type":"array[object]","required":"否","enum":[],"xEnum":[],"description":"<p>附件列表</p>\n","children":[{"key":"pxf_root.medias.items.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>附件唯一ID</p>\n","children":[]},{"key":"pxf_root.medias.items.url","name":"url","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>附件URL</p>\n","children":[]}]},{"key":"pxf_root.root_node","name":"root_node","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>根节点</p>\n","children":[{"key":"pxf_root.root_node.attachment_id","name":"attachment_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>附件ID，在节点类型为nt_page、nt_picture、nt_table、nt_chart时有效</p>\n","children":[]},{"key":"pxf_root.root_node.auto_generate_picture","name":"auto_generate_picture","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>图片节点是否开启文配图、图示配图，仅在节点类型为nt_picture时有效</p>\n","children":[]},{"key":"pxf_root.root_node.children","name":"children","deprecated":false,"type":"array[object]","required":"是","enum":[],"xEnum":[],"description":"<p>子节点数组</p>\n","children":[]},{"key":"pxf_root.root_node.components","name":"components","deprecated":false,"type":"array[object]","required":"是","enum":[],"xEnum":[],"description":"<p>节点附件信息</p>\n","children":[{"key":"pxf_root.root_node.components.items.media_id","name":"media_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>附件id</p>\n","children":[]},{"key":"pxf_root.root_node.components.items.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["image","table"],"xEnum":["image","table"],"description":"<p>附件类型</p>\n","children":[]}]},{"key":"pxf_root.root_node.diagram_type","name":"diagram_type","deprecated":false,"type":"string","required":"否","enum":["dt_seq","dt_stp","dt_cir","dt_pyr","dt_mat","dt_dis","dt_hie","dt_cst"],"xEnum":["dt_seq","dt_stp","dt_cir","dt_pyr","dt_mat","dt_dis","dt_hie","dt_cst"],"description":"<p>图示类型，仅在节点类型为nt_diagram时有效</p>\n","children":[]},{"key":"pxf_root.root_node.height","name":"height","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>对象在幻灯片上的高度</p>\n","children":[]},{"key":"pxf_root.root_node.node_type","name":"node_type","deprecated":false,"type":"string","required":"是","enum":["nt_multi_page","nt_page","nt_span","nt_diagram","nt_diagram_item","nt_title","nt_subtitle","nt_author","nt_date","nt_section_num","nt_text","nt_item_num","nt_numeric","nt_year","nt_company","nt_contact","nt_picture","nt_icon","nt_chart","nt_table"],"xEnum":["nt_multi_page","nt_page","nt_span","nt_diagram","nt_diagram_item","nt_title","nt_subtitle","nt_author","nt_date","nt_section_num","nt_text","nt_item_num","nt_numeric","nt_year","nt_company","nt_contact","nt_picture","nt_icon","nt_chart","nt_table"],"description":"<p>节点类型</p>\n","children":[]},{"key":"pxf_root.root_node.num","name":"num","deprecated":false,"type":"number","required":"否","enum":[],"xEnum":[],"description":"<p>数字，仅在节点类型为nt_numeric时有效</p>\n","children":[]},{"key":"pxf_root.root_node.page_type","name":"page_type","deprecated":false,"type":"string","required":"否","enum":["pt_title","pt_contents","pt_section_title","pt_text","pt_end"],"xEnum":["pt_title","pt_contents","pt_section_title","pt_text","pt_end"],"description":"<p>页面类型，仅在节点类型为nt_page时有效</p>\n","children":[]},{"key":"pxf_root.root_node.shape_guid","name":"shape_guid","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>附件在幻灯片页上的对象ID</p>\n","children":[]},{"key":"pxf_root.root_node.text","name":"text","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>文本，在节点类型为文本类有效</p>\n","children":[]},{"key":"pxf_root.root_node.width","name":"width","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>对象在幻灯片上的宽度</p>\n","children":[]}]}]},{"key":"theme_params","name":"theme_params","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>主题参数</p>\n","children":[{"key":"theme_params.designated_theme","name":"designated_theme","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>指定主题模板信息,至少需要传入 designated_theme 或 rec_theme 中的一个</p>\n","children":[{"key":"theme_params.designated_theme.theme_id","name":"theme_id","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>主题模板id</p>\n","children":[]},{"key":"theme_params.designated_theme.theme_key","name":"theme_key","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>主题模板key值 以emuate_ + id组合即可，企业模板（标准模板）以template_standard传值</p>\n","children":[]}]}]}]' />

## 请求体示例
```json
{
  "author_name": "string",
  "gen_mode": 0,
  "md_outlines": "string",
  "multi_page_outlines": {
    "attachments": [
      {
        "attachment_format": "af_pic",
        "attachment_id": "string",
        "url": "string"
      }
    ],
    "data_describe_type": "dt_multi_page",
    "data_version": "string",
    "doc_name": "string",
    "root_node": {
      "children": {
        "attachment_id": "string",
        "children": [
          {}
        ],
        "diagram_type": "dt_seq",
        "node_type": "nt_multi_page",
        "text": "string"
      },
      "node_type": "nt_multi_page"
    }
  },
  "pptx_params": {
    "content_item_count": 0,
    "disable_gen_file": true,
    "disable_gen_thumb": true,
    "disable_generate_pic": true,
    "filter_slide_types": [
      "string"
    ],
    "generate_index": [
      0
    ],
    "generate_language": "string",
    "generate_picture_keyword": "string",
    "generate_picture_mode": 0,
    "merge_slides": true,
    "slides_count": 0,
    "standard_template_key": "string"
  },
  "pxf_root": {
    "data_describe_type": "dt_multi_page",
    "data_version": "string",
    "doc_name": "string",
    "medias": [
      {
        "id": "string",
        "url": "string"
      }
    ],
    "root_node": {
      "attachment_id": "string",
      "auto_generate_picture": true,
      "children": [
        {}
      ],
      "components": [
        {
          "media_id": "string",
          "type": "image"
        }
      ],
      "diagram_type": "dt_seq",
      "height": 0,
      "node_type": "nt_multi_page",
      "num": 0,
      "page_type": "pt_title",
      "shape_guid": "string",
      "text": "string",
      "width": 0
    }
  },
  "theme_params": {
    "designated_theme": {
      "theme_id": 0,
      "theme_key": "string"
    }
  }
}
```

## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `text/event-stream`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]},{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>生成PPT返回结果</p>\n","children":[{"key":"data.message","name":"message","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>sse事件数据</p>\n","children":[{"key":"data.message.action","name":"action","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>action</p>\n","children":[]},{"key":"data.message.code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>响应状态码</p>\n","children":[]},{"key":"data.message.data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>生成PPT响应数据</p>\n","children":[{"key":"data.message.data.pptx_data","name":"pptx_data","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>PPTX生成数据</p>\n","children":[{"key":"data.message.data.pptx_data.file_url","name":"file_url","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>生成幻灯片云存储链接</p>\n","children":[]},{"key":"data.message.data.pptx_data.generate_state","name":"generate_state","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>幻灯片生成状态</p>\n","children":[]},{"key":"data.message.data.pptx_data.outlines_pages","name":"outlines_pages","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>大纲页数</p>\n","children":[]},{"key":"data.message.data.pptx_data.ppt_pages","name":"ppt_pages","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>幻灯片页数</p>\n","children":[]},{"key":"data.message.data.pptx_data.slide_index","name":"slide_index","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>当前处理的幻灯片索引（-1 表示无幻灯片，无实际意义）</p>\n","children":[]},{"key":"data.message.data.pptx_data.slide_type","name":"slide_type","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>幻灯片类型（startpage/contentpage/transitionpage/catalogpage/endpage）</p>\n","children":[]},{"key":"data.message.data.pptx_data.task_id","name":"task_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>任务标识</p>\n","children":[]},{"key":"data.message.data.pptx_data.thumb_url","name":"thumb_url","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>缩略图链接</p>\n","children":[]},{"key":"data.message.data.pptx_data.total","name":"total","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>总页数</p>\n","children":[]}]},{"key":"data.message.data.sequence_num","name":"sequence_num","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>流序号</p>\n","children":[]},{"key":"data.message.data.stream_status","name":"stream_status","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>流状态【reply、done】</p>\n","children":[]},{"key":"data.message.data.type","name":"type","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>响应数据类型</p>\n","children":[]}]},{"key":"data.message.msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>响应消息</p>\n","children":[]}]}]}]' />

## 响应体示例
```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "message": {
      "action": "string",
      "code": 0,
      "data": {
        "pptx_data": {
          "file_url": "string",
          "generate_state": "string",
          "outlines_pages": 0,
          "ppt_pages": 0,
          "slide_index": 0,
          "slide_type": "string",
          "task_id": "string",
          "thumb_url": "string",
          "total": 0
        },
        "sequence_num": 0,
        "stream_status": "string",
        "type": "string"
      },
      "msg": "string"
    }
  }
}
```