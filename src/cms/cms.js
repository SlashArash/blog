import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import SinglePagePreview from './preview-templates/SinglePagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('about', SinglePagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
