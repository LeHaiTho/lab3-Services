
import { View } from 'react-native'
import { List, Card, Avatar, IconButton, Divider } from 'react-native-paper'

const JobItem = ({ index, title, time }) => {
  return (

    <View>
      <Card.Title
        title={title}
        titleVariant='bodyLarge'
        titleStyle={{
          fontWeight: 'bold'
        }}
        subtitle={time}
        subtitleStyle={{
          fontStyle: 'italic',
        }}
        left={(props) => <Avatar.Icon {...props} icon="folder" />}
      />
      <Divider />
    </View>

  )
}

export default JobItem