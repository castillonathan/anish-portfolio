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
  const items = await getProjectItems(projectId)

  if (!items.length) {
    return null
  }

  for (const item of items) {
    const assets = await getProjectAssets(item.id)

    const imageAsset = assets.find(
      (asset) => asset.asset_type === 'image' && asset.file_url
    )

    if (imageAsset?.file_url) {
      return imageAsset.file_url
    }
  }

  return null
}