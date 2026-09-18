import { supabase } from './supabase'

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data
}

export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }

  return data
}

export async function getProjectItems(projectId: number) {
  const { data, error } = await supabase
    .from('project_items')
    .select('*')
    .eq('project_id', projectId)
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching project items:', error)
    return []
  }

  return data
}

export async function getProjectAssets(projectItemId: number) {
  const { data, error } = await supabase
    .from('project_assets')
    .select('*')
    .eq('project_item_id', projectItemId)
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching project assets:', error)
    return []
  }

  return data
}

export async function getProjectCover(projectId: number) {
  const projects = await getProjects()

  const project = projects.find(
    (project) => project.id === projectId
  )

  if (project?.cover_image) {
    return project.cover_image
  }

  const items = await getProjectItems(projectId)

  if (!items.length) {
    return null
  }

  for (const item of items) {
    const assets = await getProjectAssets(item.id)

    const imageAsset = assets.find(
      (asset) => asset.asset_type === "image" && asset.file_url
    )

    if (imageAsset?.file_url) {
      return imageAsset.file_url
    }
  }

  return null
}
export async function getVideos() {
  const { data: videoAssets, error: videoError } = await supabase
    .from('project_assets')
    .select('*')
    .eq('asset_type', 'video')
    .order('display_order', { ascending: true })

  if (videoError) {
    console.error('Error fetching videos:', videoError)
    return []
  }

  if (!videoAssets?.length) {
    return []
  }

  const itemIds = [
    ...new Set(videoAssets.map((asset) => asset.project_item_id)),
  ]

  const { data: items, error: itemError } = await supabase
    .from('project_items')
    .select('*')
    .in('id', itemIds)

  if (itemError) {
    console.error('Error fetching video project items:', itemError)
    return []
  }

  if (!items?.length) {
    return []
  }

  const projectIds = [
    ...new Set(items.map((item) => item.project_id)),
  ]

  const { data: projects, error: projectError } = await supabase
    .from('projects')
    .select('id, title, slug')
    .in('id', projectIds)

  if (projectError) {
    console.error('Error fetching video projects:', projectError)
    return []
  }

  return videoAssets.map((asset) => {
    const item = items.find(
      (item) => item.id === asset.project_item_id
    )

    const project = projects?.find(
      (project) => project.id === item?.project_id
    )

    return {
      ...asset,
      project_item_title: item?.title ?? '',
      project_id: project?.id ?? null,
      project_title: project?.title ?? '',
      project_slug: project?.slug ?? '',
    }
  })
}